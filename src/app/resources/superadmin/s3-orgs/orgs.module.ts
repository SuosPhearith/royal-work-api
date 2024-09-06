// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
// =========================================================================>> Custom Library
import { FileService } from 'src/app/services/file.service';
import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';


@Module({
    controllers: [OrgsController], 
    providers: [OrgsService, FileService] 
})

export class OrgsModule { }