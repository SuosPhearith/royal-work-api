// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Delete, Param, Put, UseGuards, Query } from '@nestjs/common';
// =========================================================================>> Custom Library
import { FileTypeService } from './fileType.service';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';
import { fileTypeCreateDto, fileTypeUpdateDto } from './fileType.dto';
import { AuthGuard } from 'src/app/middleware/guards/auth.guard';

@Roles(UserRoleDecorator.SUPERADMIN)
@UseGuards(AuthGuard)
@Controller()
export class FileTypeController {

    constructor(private fileTypeService: FileTypeService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(@Query('search') search?: string): Promise<any> {
        try{
            return await this.fileTypeService.read(search);
        } catch(error){
            throw new Error();
        }
    }

    @Post()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async create(
        @Body() body: fileTypeCreateDto
    ): Promise<any> {
        try{
            return await this.fileTypeService.create(body);

        } catch(error){
            throw new Error();
        }
    }

    //===========================================>> Update
    @Put(':id')
    async update(
            @Param('id') id: number, 
            @Body() body: fileTypeUpdateDto
    ): Promise<any> {
        try {
                return this.fileTypeService.update(id, body);
            } catch (error) {
    
                throw new Error();
            }
    
    }

    //===========================================>> Delete 
    @Delete(':id')
    async delete(@Param('id') id: number) {

        try {
            return await this.fileTypeService.delete(id);

        } catch (error) {
            throw new Error();
        }
    }
}