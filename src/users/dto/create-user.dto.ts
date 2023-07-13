import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsOptional, ValidateNested } from 'class-validator';
import { Match } from 'src/common/validation/match.decorator';
import { Prop } from '@nestjs/mongoose';
import { AboutUserDto } from './about-user.dto';
import {Type} from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsNumberString()
  @IsNotEmpty()
  password: string;
  
  @IsNumberString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;

	@Prop()
  refreshToken: string;

  @IsOptional()
  @ValidateNested() @Type(() => AboutUserDto)
  about: AboutUserDto[];
}
