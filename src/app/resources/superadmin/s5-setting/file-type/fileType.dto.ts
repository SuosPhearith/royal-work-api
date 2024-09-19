// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class fileTypeCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    @MaxLength(100, {message: "Name is too long"})
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Image is required!" })
    @MaxLength(100, {message: "Image uri is too long"})
    image_uri: string;
}

export class fileTypeUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    @MaxLength(100, {message: "Name is too long"})
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, {message: "Image uri is too long"})
    image_uri: string;
}