// =========================================================================>> Core Library
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// =========================================================================>> Custom Library
import { LoginRequestDto, UserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // Endpoint for user login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() data: LoginRequestDto): Promise<{ access_token: string, expires_in: string, user: UserDto }> {
        // Call the login method from the AuthService to handle the login logic
        return await this.authService.login(data);
    }
}