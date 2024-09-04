// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { FileTypeService } from './fileType.service';
// =========================================================================>> Custom Library


@Controller()
export class FileTypeController {

    constructor(private fileTypeService: FileTypeService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.fileTypeService.read();
        } catch(error){
            throw new Error();
        }
    }

}