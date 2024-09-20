// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class docsTypeCUDto{
    @IsString()
    @IsNotEmpty({ message: "Name is required!" })
    @MaxLength(50, {message: "Name is too long"})
    name: string;
}