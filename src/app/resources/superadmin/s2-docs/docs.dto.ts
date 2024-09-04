// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString } from 'class-validator';

export class DocsResponseDto{
    title: string;
    orgs: string;
    docs_type: string;
    file_size: number;
    created_at: Date;
    file_uri: string;
    is_active: boolean;
}

export class DocsCUDto{
    @IsString()
    @IsNotEmpty({ message: "Title is required!" })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "Organization is required!" })
    orgs: string;

    @IsString()
    @IsNotEmpty({ message: "Document type is required!" })
    docs_type: string;

    @IsString()
    @IsNotEmpty({ message: "Status is required!" })
    is_active: boolean;

    @IsString()
    @IsNotEmpty({ message: "File is required!" })
    file_uri: string;
}