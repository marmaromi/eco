import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { AuthDto } from '../auth/dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Post('update')
  updateUser(@Body() dto: UserDto, @GetUser('email') email: string) {
    return this.userService.updateUserDetails(dto, email);
  }

  @Post('update/password')
  updateUserPassword(@Body() updateDto: AuthDto, @GetUser() user: User) {
    return this.userService.updateUserPassword(updateDto, user);
  }
}
