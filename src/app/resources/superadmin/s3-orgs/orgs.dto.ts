// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class OrgsResponseDto{
    kh_name: string;
    en_name: string;
    image_uri: string;
    created_at: Date;
    num_docs: number;   
}

export class OrgsCUDto{
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