// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
import { FileService } from 'src/app/services/file.service';

// =========================================================================>> Custom Library
import { TelegramService } from 'src/app/services/telegram.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';


@Module({
    controllers: [ProfileController], 
    providers: [ProfileService, TelegramService, FileService] 
})

export class ProfileModule { }
