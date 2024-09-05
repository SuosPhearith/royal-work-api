// =========================================================================>> Third Party Library
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class DocsCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Title is required!" })
    title: string;

    @IsNumber()
    @IsNotEmpty({ message: "Organization is required!" })
    orgs_id: number;

    @IsNumber()
    @IsOptional()
    file_id: number;

    @IsNumber()
    @IsNotEmpty({ message: "Document type is required!" })
    docs_type_id: number;

    @IsBoolean()
    @IsNotEmpty({ message: "Status is required!" })
    is_active: boolean;

    @IsNumber()
    @IsOptional()
    creator_id: number;
}

export class DocsUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Title is required!" })
    title: string;

    @IsNumber()
    @IsNotEmpty({ message: "Organization is required!" })
    orgs_id: number;

    @IsNumber()
    @IsOptional()
    file_id: number;

    @IsNumber()
    @IsNotEmpty({ message: "Document type is required!" })
    docs_type_id: number;

    @IsBoolean()
    @IsNotEmpty({ message: "Status is required!" })
    is_active: boolean;

    @IsNumber()
    @IsOptional()
    creator_id: number;
}