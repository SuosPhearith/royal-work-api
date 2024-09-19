// =========================================================================>> Third Party Library
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';


export class DocsCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Title is required!" })
    @MaxLength(300, {message: "Title is too long"})
    title: string;

    @IsNumber()
    @IsNotEmpty({ message: "Organization is required!" })
    orgs_id: number;

    @IsNumber()
    @IsNotEmpty({ message: "Document type is required!" })
    docs_type_id: number;

    @IsNotEmpty({ message: "Status is required!" })
    is_active: boolean | string;
}

export class DocsUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Title is required!" })
    @MaxLength(300, {message: "Title is too long"})
    title: string;

    @IsNumber()
    @IsNotEmpty({ message: "Organization is required!" })
    orgs_id: number;

    @IsNumber()
    @IsNotEmpty({ message: "Document type is required!" })
    docs_type_id: number;

    @IsNotEmpty({ message: "Status is required!" })
    is_active: boolean | string;
}