// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
// =========================================================================>> Third Party Library
import * as multer from 'multer';
// =========================================================================>> Custom Library

// Middleware (Authenication & Authorization)
import { AuthInterceptor } from './app/middleware/interceptors/auth.interceptor';
// Main Controller
import { AppController } from './app.controller';
// Exception filter errors
import { ExceptionFilterErrors } from './app/shared/handle.errors';


// ===>> Model
import { DatabaseModule } from './models/database.module';
// ===>> Role Register

// Account
import { AuthModule } from './app/resources/account/auth/auth.module';
import { appRoutes } from './app.routes';
import { SuperAdminModule } from './app/resources/superadmin/super-admin.module';
import { ProfileModule } from './app/resources/account/profile/profile.module';

// User role

// ======================================= >> Code Starts Here << ========================== //

@Module({
    imports: [
        MulterModule.register({
            storage: multer.memoryStorage()
        }),
        // ============================= >> Role Register << ========================== //
        DatabaseModule,
        AuthModule,
        ProfileModule,
        SuperAdminModule,
        RouterModule.register(appRoutes)
    ],
    controllers: [AppController], // Controller Declaration
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: ExceptionFilterErrors,
        },
    ],
})
export class AppModule { }
