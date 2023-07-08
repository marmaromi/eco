import { Prisma } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';

export function sendError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ForbiddenException(error.message);
    }
  }
  throw error;
}
