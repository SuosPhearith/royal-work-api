// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
// =========================================================================>> Custom Library
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { FileService } from 'src/app/services/file.service';

@Module({
    controllers: [DocsController], 
    providers: [DocsService, FileService] 
})

export class DocsModule { }