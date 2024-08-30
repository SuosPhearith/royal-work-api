import { Logger } from '@nestjs/common';
import axios from 'axios';
import * as TelegramBot from 'node-telegram-bot-api';
export class TelegramService {
    private bot: TelegramBot;
    private readonly logger = new Logger(TelegramService.name);

    constructor() {
        try {
            const botToken = process.env.TELEGRAM_BOT_TOKEN || 'bot_token';
            this.bot = new TelegramBot(botToken);
        } catch (error) {
            this.handleInitializationError(error);
        }
    }

    private handleInitializationError(error: any) {
        this.logger.error('Error initializing Telegram bot:', error);
    }

    async sendOpt(chatId: number, message: string): Promise<any> {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
            throw new Error('TELEGRAM_BOT_TOKEN environment variable is not defined.');
        }

        const otpResponse = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                chat_id: chatId,
                text: message,
            }
        );
        return otpResponse.data;
    }

}
