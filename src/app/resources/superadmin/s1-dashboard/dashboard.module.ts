// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
// =========================================================================>> Custom Library
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
@Module({
    controllers: [DashboardController], 
    providers: [DashboardService] 
})

export class DashboardModule { }