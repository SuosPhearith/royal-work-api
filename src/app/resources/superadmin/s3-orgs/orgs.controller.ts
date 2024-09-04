// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { OrgsService } from './orgs.service';
// =========================================================================>> Custom Library


@Controller()
export class OrgsController {

    constructor(private orgsService: OrgsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.orgsService.read();
        } catch(error){
            throw new Error();
        }
    }

}