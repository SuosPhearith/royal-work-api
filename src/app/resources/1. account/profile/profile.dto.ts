import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator'
import { UsersActiveEnum } from 'src/app/enums/user/active.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty(({ message: 'សូមបញ្ជូលលេខទូរសព្ទ' }))
    @Matches(/^(\+855|0)[1-9]\d{7,8}$/, {
        message: 'Phone must be valit Cambodia phone number'
    })
    phone: string

    @IsEmail()
    email: string

    @MinLength(6)
    @IsString()
    password: string

    @IsString()
    @IsNotEmpty()
    avatar: string
}

export class UpdateUserDto {

    @IsInt()
    @IsNotEmpty()
    user_title: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty(({ message: 'សូមបញ្ជូលលេខទូរសព្ទ' }))
    @Matches(/^(\+855|0)[1-9]\d{7,8}$/, {
        message: 'Phone must be valit Cambodia phone number'
    })
    phone: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsOptional()
    @IsString()
    avatar: string
}

export class UpdateUserPasswordDto {

    @MinLength(6)
    @IsString()
    old_password: string;

    @MinLength(6)
    @IsString()
    new_password: string;

    @MinLength(6)
    @IsString()
    confirm_password: string;
}

export class UpdatePasswordDto {
    @MinLength(6)
    @IsString()
    password: string;

    @MinLength(6)
    @IsString()
    confirm_password: string;
}

export class UpdateStatusDto {
    @IsEnum(UsersActiveEnum)
    is_active: UsersActiveEnum;
}
