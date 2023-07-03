import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {

  signup() {
    return {msg: 'I am signed up'};
  }

  login() {
    return {msg: 'I am logged in'};
  }
}
