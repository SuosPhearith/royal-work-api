// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class fileTypeResponseDto{
    name: string;
    image_uri: string;
    num_docs: number;
}

export class fileTypeCUDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Image is required!" })
    image_uri: string;
}