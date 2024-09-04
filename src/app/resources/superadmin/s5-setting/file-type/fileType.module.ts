// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
// =========================================================================>> Custom Library
import { FileService } from 'src/app/services/file.service';
import { FileTypeController } from './fileType.controller';
import { FileTypeService } from './fileType.service';



@Module({
    controllers: [FileTypeController], 
    providers: [FileTypeService, FileService] 
})

export class FileTypeModule { }