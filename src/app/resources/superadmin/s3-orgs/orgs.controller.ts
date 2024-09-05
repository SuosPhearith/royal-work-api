// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';
import { OrgsCreateDto, OrgsUpdateDto } from './orgs.dto';
// =========================================================================>> Custom Library

@Roles(UserRoleDecorator.SUPERADMIN)
@Controller()
export class OrgsController {

    constructor(private orgsService: OrgsService) { }
    
    //===========================================>> Get
    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.orgsService.read();
        } catch(error){
            throw new Error();
        }
    }

    //===========================================>> Create
    @Post()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async create(
        @Body() body: OrgsCreateDto
    ): Promise<any> {
        try{
            return await this.orgsService.create(body);

        } catch(error){
            throw new Error();
        }
    }

    //===========================================>> Update
    @Put(':id')
    async update(
            @Param('id') id: number, 
            @Body() body: OrgsUpdateDto
    ): Promise<any> {
        try {
                return this.orgsService.update(id, body);
            } catch (error) {
    
                throw new Error();
            }
    
    }

    //===========================================>> Delete 
    @Delete(':id')
    async delete(@Param('id') id: number) {

        try {
            return await this.orgsService.delete(id);

        } catch (error) {
            throw new Error();
        }
    }

}