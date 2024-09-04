// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { DocsTypeService } from './docsType.service';
// =========================================================================>> Custom Library


@Controller()
export class DocsTypeController {

    constructor(private docsTypeService: DocsTypeService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.docsTypeService.read();
        } catch(error){
            throw new Error();
        }
    }

}