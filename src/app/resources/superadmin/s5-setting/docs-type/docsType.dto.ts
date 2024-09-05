// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class docsTypeCUDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    name: string;
}