import { IsEmail, IsString, Length } from "class-validator";

export class LoginModel {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}

export class ForgotPasswordModel {
  @IsString()
  @Length(8, 20)
  password: string;
}

export class Auth2Model {
  @IsString()
  auth2token: string;
}
