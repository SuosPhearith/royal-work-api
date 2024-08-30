import { SetMetadata } from "@nestjs/common";

export enum UserRoleDecorator {
    SUPERADMIN          = 1,
    USER                = 2,
}


export const Roles = (...roles: UserRoleDecorator[]) => SetMetadata('roles', roles)