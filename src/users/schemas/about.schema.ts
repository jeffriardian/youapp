import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';
 
export type AboutDocument = About & Document;
 
@Schema()
export class About {
  @Transform(({ value }) => value.toString())
  _id: string;
 
  @Prop()
  name: string;
 
  @Prop()
  gender: string;

  @Prop({ type: Date })
  birthday: Date;
 
  @Prop()
  horoscope: string;
 
  @Prop()
  zodiac: string;
 
  @Prop()
  height: number;
 
  @Prop()
  weight: number;
}

export const aboutObjectSchema =   SchemaFactory.createForClass(About);

aboutObjectSchema.pre('save', function (next) {
    next();
});
 
export const AboutSchema = SchemaFactory.createForClass(About);