// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
// =========================================================================>> Custom Library
import { UserService } from './user.service';
import { UserCreateDto, UserPasswordUpdateDto, UserUpdateDto } from './user.dto';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';
import { AuthGuard } from 'src/app/middleware/guards/auth.guard';

@Roles(UserRoleDecorator.SUPERADMIN)
@UseGuards(AuthGuard)
@Controller()
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
    async find(): Promise<any> {
        try{
            return await this.userService.read();
        } catch(error){
            throw new Error();
        }
    }

      //===========================================>> Create
      @Post()
      @HttpCode(HttpStatus.OK)    //return status code: 200 if succeeded!
      async create(
          @Body() body: UserCreateDto
      ): Promise<any> {
          try{
              return await this.userService.create(body);
  
          } catch(error){
              throw new Error();
          }
      }
  
      //===========================================>> Update Info
      @Put(':id')
      async update(
              @Param('id') id: number, 
              @Body() body: UserUpdateDto
      ): Promise<any> {
          try {
                  return this.userService.update(id, body);
              } catch (error) {
      
                  throw new Error();
              }
      
      }

      //===========================================>> Update Password
      @Put('password/:id')
      async updatePassword(
              @Param('id') id: number, 
              @Body() body: UserPasswordUpdateDto
      ): Promise<any> {
          try {
                  return this.userService.updatePassword(id, body);
              } catch (error) {
      
                  throw new Error();
              }
      
      }
  
      //===========================================>> Delete 
      @Delete(':id')
      async delete(@Param('id') id: number) {
  
          try {
              return await this.userService.delete(id);
  
          } catch (error) {
              throw new Error();
          }
      }
  
}