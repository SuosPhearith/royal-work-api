import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MinLength, IsNumber } from 'class-validator'
import { UsersActiveEnum } from 'src/app/enums/user/active.enum';

export class UpdateProfileDto {
    @IsString()
    @IsNotEmpty()
    kh_name: string

    @IsString()
    @IsOptional()
    en_name: string

    @IsString()
    @IsNotEmpty(({ message: 'សូមបញ្ជូលលេខទូរសព្ទ' }))
    @Matches(/^(\+855|0)[1-9]\d{7,8}$/, {
        message: 'Phone must be valit Cambodia phone number'
    })
    phone: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    avatar: string

    @IsNumber()
    @IsNotEmpty({ message: "Role is required!" })
    role_id: number;
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
        message: 'Phone must be valid Cambodia phone number'
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
