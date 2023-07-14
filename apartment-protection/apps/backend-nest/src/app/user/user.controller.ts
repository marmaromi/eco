import { Body, Controller, Get, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { PasswordDto } from "../auth/dto";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('logged-in')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Put(':id',)
  updateUser(@Body() dto: UserDto, @Param('id') userId: string) {
    return this.userService.updateUserDetails(dto, userId);
  }

  @Patch(':id/password')
  updateUserPassword(@Body() passwordDto: PasswordDto, @Param('id') userId: string) {
    return this.userService.updateUserPassword(passwordDto.password, userId);
  }
}
