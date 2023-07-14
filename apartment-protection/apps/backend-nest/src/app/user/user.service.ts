import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { sendError } from '../error-handling';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserDetails(dto: UserDto, userId: string) {
    updateUserDetails: try {
      const userWithSameEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (userWithSameEmail?.email === dto?.email && userWithSameEmail?.id !== userId) {
        sendError(new ForbiddenException('Email already exists'));
        break updateUserDetails;
      }

      const data = {};
      for (const [key, value] of Object.entries(dto)) {
        if (key !== 'password' && key !== 'role' && value) {
          data[key] = value;
        }
      }
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data,
      });
      delete updatedUser.password;
      return updatedUser;

    } catch (error) {
      sendError(error);
    }
  }

  async updateUserPassword(password: string, userId: string) {
    const hash = await argon.hash(password);

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { password: hash },
      });

      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      sendError(error);
    }
  }
}
