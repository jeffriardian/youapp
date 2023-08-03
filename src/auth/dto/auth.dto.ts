import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsOptional } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsOptional()
  email: string;
  
  @IsString()
  @IsOptional()
  username: string;
  
  @IsNumberString()
  @IsNotEmpty()
  password: string;
}
