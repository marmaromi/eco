import {ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {AuthModel} from './models';
import * as argon from 'argon2';
import {Prisma} from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {
  }

  async signup(dto: AuthModel) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      delete user.password;
      return user;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already exists');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthModel) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Wrong credentials');
    }

    const isPasswordValid = await argon.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong credentials');
    }

    delete user.password;
    return user;
  }
}
