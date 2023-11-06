import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserModel {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}

export class UpdateUserModel {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
