import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from "./dto";
import { AuthDto } from '../auth/dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserDetails(dto: UserDto, userEmail: string) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingEmail && existingEmail.email !== userEmail) {
        throw new ForbiddenException('Email already exists');
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Something went wrong');
        }
      }
      throw error;
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Something went wrong');
        }
      }
      throw error;
    }
  }
}
