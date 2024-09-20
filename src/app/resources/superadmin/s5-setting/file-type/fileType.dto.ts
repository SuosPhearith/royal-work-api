// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class fileTypeCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    @MaxLength(100, {message: "Name is too long"})
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Image is required!" })
    image_uri: string;
}

export class fileTypeUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    @MaxLength(100, {message: "Name is too long"})
    name: string;

    @IsString()
    @IsOptional()
    image_uri: string;
}