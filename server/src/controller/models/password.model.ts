import { IsEmail, IsString, IsUUID, Length } from "class-validator";

export class CreatePasswordModel {
  @IsString()
  platform: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}

export class UpdatePasswordModel {
  @IsUUID()
  id: string;

  @IsString()
  platform: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}
