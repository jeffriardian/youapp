import { Prop, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';


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
