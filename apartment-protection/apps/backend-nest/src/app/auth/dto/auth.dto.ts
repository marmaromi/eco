import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
  ValidateIf,
} from 'class-validator';
import { User } from '../../../../../../libs/models/user';

export class AuthDto
  implements Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>
{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/^(?=.*[A-Z]).{1,}$/, { message: 'Uppercase letter required' })
  @Matches(/^(?=.*[a-z]).{1,}$/, { message: 'Lowercase letter required' })
  @Matches(/^(?=.*\d).{1,}$/, { message: 'Number required' })
  @Matches(/^(?=.*[^\da-zA-Z]).{1,}$/, {
    message: 'Special character required',
  })
  @NotContains(' ')
  password: string;

  @ValidateIf((o) => o.firstName)
  @IsString()
  @Matches(/^[a-zA-Z\s-']{1,}$/, {
    message: 'Only letters, spaces, hyphens, apostrophes and dashes allowed',
  })
  firstName?: string;

  @ValidateIf((o) => o.lastName)
  @IsString()
  @Matches(/^[a-zA-Z\s-']{1,}$/, {
    message: 'Only letters, spaces, hyphens, apostrophes and dashes allowed',
  })
  lastName?: string;
}
