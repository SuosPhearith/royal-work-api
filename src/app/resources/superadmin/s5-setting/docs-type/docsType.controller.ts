// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
// =========================================================================>> Custom Library
import { DocsTypeService } from './docsType.service';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';
import { docsTypeCUDto } from './docsType.dto';
import { AuthGuard } from 'src/app/middleware/guards/auth.guard';

@Roles(UserRoleDecorator.SUPERADMIN)
@UseGuards(AuthGuard)
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

    @Post()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async create(
        @Body() body: docsTypeCUDto
    ): Promise<any> {
        try{
            return await this.docsTypeService.create(body);

        } catch(error){
            throw new Error();
        }
    }

    //===========================================>> Update
    @Put(':id')
    async update(
            @Param('id') id: number, 
            @Body() body: docsTypeCUDto
    ): Promise<any> {
        try {
                return this.docsTypeService.update(id, body);
            } catch (error) {
    
                throw new Error();
            }
    
    }

    //===========================================>> Delete 
    @Delete(':id')
    async delete(@Param('id') id: number) {

        try {
            return await this.docsTypeService.delete(id);

        } catch (error) {
            throw new Error();
        }
    }

}