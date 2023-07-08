import { User } from "../../../../../../libs/models/user";
import { IsEmail, IsNotEmpty, IsString, Matches, ValidateIf } from "class-validator";

export class UserDto implements Pick<User, 'email' | 'firstName' | 'lastName'> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
