// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
// =========================================================================>> Custom Library
import { DocsService } from './docs.service';

@Controller()
export class DocsController {

    constructor(private docsService: DocsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.docsService.read();
        } catch(error){
            throw new Error();
        }
    }

}