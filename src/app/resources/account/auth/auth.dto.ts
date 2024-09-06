// =========================================================================>> Third Party Library
import { IsNotEmpty, IsString } from 'class-validator';

// =========================================================================>> Custom Library
import User from 'src/models/user/user.model';
import UserRole from 'src/models/user/user_role.model';

export class UserDto {
    id: number;
    kh_name: string;
    en_name: string;
    avatar: string;
    phone: string;
    email: string;
    roles: RoleDto[];

    constructor(user: User) {
        this.id = user.id;
        this.kh_name = user.kh_name;
        this.en_name = user.en_name;
        this.avatar = user.avatar;
        this.phone = user.phone;
        this.email = user.email;
        this.roles = user.roles.map(userRole => new RoleDto(userRole.role, userRole));
    }
}

export class UserRolesDto {
    role: string;
    constructor(role: UserRole) {
        this.role = role.role.name;
    }
}

export class RoleDto {
    name: string;
    slug: string;
    is_default: number;
    constructor(role: any = null, userRole: UserRole) {
        this.name = role?.name || '';
        this.slug = role?.slug || '';
        this.is_default = userRole?.is_default? 1 : 0; // 1: true, 0: false  // role.is_default? true : false;  // is_default: e.is_default? 1 : 0  // this.is_default = role.is_default? true : false;  // is_default: e.is_default? 1 : 0  // this.is_default = role
    }
}


export class LoginRequestDto {
    @IsString()
    @IsNotEmpty({ message: "Field phone is required" })
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}
