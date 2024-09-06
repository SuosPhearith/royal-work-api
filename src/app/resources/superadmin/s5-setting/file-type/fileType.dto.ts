// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class fileTypeCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Image is required!" })
    image_uri: string;
}

export class fileTypeUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    name: string;

    @IsString()
    @IsOptional()
    image_uri: string;
}