import { IsNotEmpty, IsString, IsEmail, IsNumberString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsNumberString()
  @IsNotEmpty()
  password: string;
}
