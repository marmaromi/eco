import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthModel} from './models';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('signup')
  signup(@Body() dto: AuthModel) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: AuthModel) {
    return this.authService.login(dto);
  }
}
