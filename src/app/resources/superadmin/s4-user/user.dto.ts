// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserResponseDto{
    kh_name: string;
    role: string;
    avatar: string;
    phone: string;
    email: string;
    created_at: Date;
}

export class UserCUDto{
    @IsString()
    @IsNotEmpty({ message: "Khmer name is required!" })
    kh_name: string;

    @IsString()
    @IsNotEmpty({ message: "Image avatar is required!" })
    avatar: string;

    @IsString()
    @IsNotEmpty({ message: "Role is required!" })
    role: string;

    @IsString()
    @IsNotEmpty({ message: "Phone number is required!" })
    phone: string;

    @IsString()
    @IsNotEmpty({ message: "Email address is required!" })
    email: string;
}