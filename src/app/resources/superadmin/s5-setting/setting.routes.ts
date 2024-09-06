// =================================================================>> Core Library
import { Routes } from "@nestjs/core";
// =================================================================>> Custom Library
import { DocsTypeModule } from "./docs-type/docsType.module";
import { FileTypeModule } from "./file-type/fileType.module";

export const SettingRoutes: Routes = [
    {
        path: "docs-type",
        module: DocsTypeModule,
    },
    {
        path: "file-type",
        module: FileTypeModule,
    },

]