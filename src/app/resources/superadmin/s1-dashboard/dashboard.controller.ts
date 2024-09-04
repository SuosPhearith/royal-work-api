// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
// =========================================================================>> Custom Library
import { DashboardService } from './dashboard.service';
import { DashboardResponse } from './dashboard.types';
import { AnyARecord } from 'dns';

@Controller()
export class DashboardController {

    constructor(private dashboardService: DashboardService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.dashboardService.read();
        } catch(error){
            throw new Error();
        }
    }

}