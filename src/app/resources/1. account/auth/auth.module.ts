// =========================================================================>> Core Library
import { Module } from '@nestjs/common';

// =========================================================================>> Custom Library
import { TelegramService } from 'src/app/services/telegram.service';
//import { TelegramBotService } from '../../bot/bot.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController], // Register the AuthController as a controller in this module
    providers: [AuthService, TelegramService] // Register the AuthService, TelegramService, and TelegramBotService as providers in this module
})

export class AuthModule { }
