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
    @IsNotEmpty()
    horoscope: string;
    
    @IsString()
    @IsNotEmpty()
    zodiac: string;

    @IsNumber()
    @IsNotEmpty()
    height: string;
    
    @IsNumber()
    @IsNotEmpty()
    weight: string;
}