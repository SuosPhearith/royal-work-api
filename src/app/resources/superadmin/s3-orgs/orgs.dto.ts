// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class OrgsCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Image is required!" })
    image_uri: string;

    @IsString()
    @IsNotEmpty({ message: "English name is required!" })
    @MaxLength(100, {message: "English name  too long"})
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    @MaxLength(100, {message: "Khmer name is too long"})
    kh_name: string;
}

export class OrgsUpdateDto{
    @IsString()
    @IsOptional()
    image_uri: string;

    @IsString()
    @IsNotEmpty({ message: "English name is required!" })
    @MaxLength(100, {message: "English name is too long"})
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    @MaxLength(100, {message: "Khmer name is too long"})
    kh_name: string;
}