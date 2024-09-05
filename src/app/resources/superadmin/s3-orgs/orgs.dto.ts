// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class OrgsCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Image is required!" })
    image_uri: string;

    @IsString()
    @IsNotEmpty({ message: "English name is required!" })
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    kh_name: string;
}

export class OrgsUpdateDto{
    @IsString()
    @IsOptional()
    image_uri: string;

    @IsString()
    @IsNotEmpty({ message: "English name is required!" })
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    kh_name: string;
}