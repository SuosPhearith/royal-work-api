// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class docsTypeResponseDto{
    name: string;
    num_docs: number;
}

export class docsTypeCUDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    name: string;
}