// =================================================================>> Core Library
import { Module } from "@nestjs/common";

// =================================================================>> Custom Library
import { DocsTypeModule } from "./docs-type/docsType.module";
import { FileTypeModule } from "./file-type/fileType.module";


@Module({
    imports: [
        DocsTypeModule,
        FileTypeModule,
    ]
})
export class SettingModule{};