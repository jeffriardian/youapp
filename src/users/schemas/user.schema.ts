import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { About, AboutSchema } from './about.schema';
import { Type } from 'class-transformer';

export type UserDocument = User & Document;

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
 
  @Prop({ type: AboutSchema })
  @Type(() => About)
  about: About[];
}

export const UserSchema = SchemaFactory.createForClass(User);
