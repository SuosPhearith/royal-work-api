// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString } from 'class-validator';


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