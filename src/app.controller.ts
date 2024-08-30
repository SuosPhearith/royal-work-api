// =========================================================================>> Core Library
import { Controller, Get, Render } from '@nestjs/common';

// =========================================================================>> Third Party Library
import * as dotenv from 'dotenv';
dotenv.config();

// ======================================= >> Code Starts Here << ========================== //
@Controller()
export class AppController {
    @Get()
    @Render('main')
    root() {
        return { message: process.env.APP };
    }
}
