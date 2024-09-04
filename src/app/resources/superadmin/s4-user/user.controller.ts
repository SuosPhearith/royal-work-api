// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
// =========================================================================>> Custom Library


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

}