import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from "./dto";
import { AuthDto } from '../auth/dto';
import * as argon from 'argon2';
import { sendError } from "../error-handling";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserDetails(dto: UserDto, userEmail: string) {
    updateUserDetails: try {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingEmail && existingEmail.email !== userEmail) {
        sendError(new ForbiddenException('Email already exists'));
        break updateUserDetails;
      }

      const data = {};
      for (const [key, value] of Object.entries(dto)) {
        if (key !== 'password' && key !== 'role' && value) {
          data[key] = value;
        }
      }

      await this.prisma.user.update({
        where: { email: userEmail },
        data,
      });
      const updatedUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      sendError(error);
    }
  }

  async updateUserPassword(updateDto: AuthDto, user: AuthDto) {
    const hash = await argon.hash(updateDto.password);

    try {
      await this.prisma.user.update({
        where: { email: user.email },
        data: {
          password: hash,
        },
      });

      const updatedUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      sendError(error);
    }
  }
}
