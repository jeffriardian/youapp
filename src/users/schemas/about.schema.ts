import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { About } from '../entity/About';
 
export type AboutDocument = About & Document;
 
export const aboutObjectSchema =   SchemaFactory.createForClass(About);

aboutObjectSchema.pre('save', function (next) {
    next();
});
 
export const AboutSchema = SchemaFactory.createForClass(About);