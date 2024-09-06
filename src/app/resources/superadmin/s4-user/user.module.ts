// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
// =========================================================================>> Custom Library
import { FileService } from 'src/app/services/file.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
    controllers: [UserController], 
    providers: [UserService, FileService] 
})

export class UserModule { }