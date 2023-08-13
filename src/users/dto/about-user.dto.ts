import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AboutUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    gender: string;
    
    @IsDateString()
    @IsNotEmpty()
    birthday: string;

    @IsString()
    horoscope: string;
    
    @IsString()
    zodiac: string;

    @IsNumber()
    @IsNotEmpty()
    height: string;
    
    @IsNumber()
    @IsNotEmpty()
    weight: string;
}