// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Param, Get, Query, UseGuards } from '@nestjs/common';
// =========================================================================>> Custom Library
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/app/middleware/guards/auth.guard';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';

@Roles(UserRoleDecorator.SUPERADMIN)
@UseGuards(AuthGuard)
@Controller()
export class DashboardController {

    constructor(private dashboardService: DashboardService) { }

    @Get('statistics')
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async findStatistics(
        @Query('key') key?: string
    ): Promise<any> {
        try{
            return await this.dashboardService.readStatistics(key);
        } catch(error){
            throw new Error();
        }
    }

    @Get('file-size')
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async findFileSize(): Promise<any> {
        try{
            return await this.dashboardService.readFileSize();
        } catch(error){
            throw new Error();
        }
    }

    @Get('docs-list')
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async findDocsList(
        @Query('key') key?: string
    ): Promise<any> {
        try{
            return await this.dashboardService.readDocsList(key);
        } catch(error){
            throw new Error();
        }
    }
}