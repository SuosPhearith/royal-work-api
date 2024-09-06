// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Put, UseGuards, Get } from '@nestjs/common';
// =========================================================================>> Custom Library
import { User as UserDecorator }    from "../../../middleware/decorators/user.decorator";
import { UpdateProfileDto, UpdateUserPasswordDto } from './profile.dto';
import User from 'src/models/user/user.model';
import { ProfileService } from './profile.service';
import { Roles, UserRoleDecorator } from 'src/app/middleware/decorators/role.decorator';
import { AuthGuard } from 'src/app/middleware/guards/auth.guard';

@Roles(UserRoleDecorator.SUPERADMIN)
@UseGuards(AuthGuard)
@Controller('api/profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async read(
        @UserDecorator() user: User
    ): Promise<any> {

        return await this.profileService.read(user.id);
    }

    @Put('update-profile')
    @HttpCode(HttpStatus.OK)
    async updateProfile(
        @Body() data: UpdateProfileDto,
        @UserDecorator() user: User
    ): Promise<any> {

        return await this.profileService.updateProfile(data, user.id);
    }

    @Put('update-password')
    @HttpCode(HttpStatus.OK)
    async updatePassword(
        @Body() data: UpdateUserPasswordDto,
        @UserDecorator() user: User
    ): Promise<any> {

        return await this.profileService.updatePassword(data, user.id);
    }
}