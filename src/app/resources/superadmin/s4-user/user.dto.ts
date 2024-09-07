// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class UserCreateDto{
    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    kh_name: string;

    @IsString()
    @IsOptional()
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Image avatar is required!" })
    avatar: string;

    @IsNumber()
    @IsNotEmpty({ message: "Role is required!" })
    role_id: number;

    @IsString()
    @IsNotEmpty({ message: "Phone number is required!" })
    phone: string;

    @IsString()
    @IsOptional()
    email: string;
}

export class UserUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    kh_name: string;

    @IsString()
    @IsOptional()
    en_name: string;

    @IsString()
    @IsNotEmpty({ message: "Image avatar is required!" })
    avatar: string;

    @IsNumber()
    @IsNotEmpty({ message: "Role is required!" })
    role_id: number;

    @IsString()
    @IsNotEmpty({ message: "Phone number is required!" })
    phone: string;

    @IsString()
    @IsOptional()
    email: string;
}

export class UserPasswordUpdateDto{
    @IsString()
    @IsNotEmpty({ message: "New password is required!" })
    new_password: string;

    @IsString()
    @IsNotEmpty({ message: "Comfirm password is required!" })
    comfirm_password: string;
}