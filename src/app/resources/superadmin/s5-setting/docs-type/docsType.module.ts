// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
// =========================================================================>> Custom Library
import { FileService } from 'src/app/services/file.service';
import { DocsTypeController } from './docsType.controller';
import { DocsTypeService } from './docsType.service';



@Module({
    controllers: [DocsTypeController], 
    providers: [DocsTypeService, FileService] 
})

export class DocsTypeModule { }