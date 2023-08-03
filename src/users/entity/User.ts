import { Prop, Schema } from '@nestjs/mongoose';
import { AboutSchema } from '../schemas/about.schema';
import { About } from './About';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';


@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @IsOptional()
  @Prop({ type: AboutSchema })
  @Type(() => About)
  about: About[];
}
