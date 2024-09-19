// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength, Matches, IsEmail, MinLength } from 'class-validator';

export class UserCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    @MaxLength(100, {message: "Khmer name is too long"})
    kh_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, {message: "English name is too long"})
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Image avatar is required!" })
    @MaxLength(100, {message: "Image avatar uri is too long"})
    avatar: string;

    @IsNumber()
    @IsNotEmpty({ message: "Role is required!" })
    role_id: number;

    @IsString()
    @IsNotEmpty({ message: "Phone number is required!" })
    @Matches(/^(\+855|0)[1-9]\d{7,8}$/, {
        message: 'Phone must be valid Cambodia phone number'
    })
    phone: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;
}

export class UserUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    @MaxLength(100, {message: "Khmer name is too long"})
    kh_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, {message: "English name is too long"})
    en_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, {message: "Image avatar uri is too long"})
    avatar: string;

    @IsNumber()
    @IsNotEmpty({ message: "Role is required!" })
    role_id: number;

    @IsString()
    @IsNotEmpty({ message: "Phone number is required!" })
    @Matches(/^(\+855|0)[1-9]\d{7,8}$/, {
        message: 'Phone must be valid Cambodia phone number'
    })
    phone: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;
}

export class UserPasswordUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "New password is required!" })
    @MinLength(6, {message: "Password is too short"})
    @MaxLength(100, {message: "Password is too long"})
    new_password: string;

    @IsString()
    @IsNotEmpty({ message: "Comfirm password is required!" })
    @MinLength(6, {message: "Password is too short"})
    @MaxLength(100, {message: "Password is too long"})
    comfirm_password: string;
}