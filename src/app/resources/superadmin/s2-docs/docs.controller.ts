// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Delete, Param, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// =========================================================================>> Custom Library
import { User as UserDecorator }    from "../../../middleware/decorators/user.decorator";
import { DocsService } from './docs.service';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';
import { DocsCreateDto, DocsUpdateDto } from './docs.dto';
import User from 'src/models/user/user.model';
import { AuthGuard } from 'src/app/middleware/guards/auth.guard';


@Roles(UserRoleDecorator.SUPERADMIN)
@UseGuards(AuthGuard)
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

    //===========================================>> Create
    @Post()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: DocsCreateDto,
        @UserDecorator() user: User
    ): Promise<any> {
        try{
            return await this.docsService.create(body, file, user.id);

        } catch(error){
            throw new Error();
        }
    }

    // //===========================================>> Update
    // @Put(':id')
    // async update(
    //         @Param('id') id: number, 
    //         @Body() body: DocsUpdateDto
    // ): Promise<any> {
    //     try {
    //             return this.docsService.update(id, body);
    //         } catch (error) {
    
    //             throw new Error();
    //         }
    
    // }

    // //===========================================>> Delete 
    // @Delete(':id')
    // async delete(@Param('id') id: number) {

    //     try {
    //         return await this.docsService.delete(id);

    //     } catch (error) {
    //         throw new Error();
    //     }
    // }
}