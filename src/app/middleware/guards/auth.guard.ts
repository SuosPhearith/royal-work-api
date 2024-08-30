// =========================================================================>> Core Library
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// =========================================================================>> Third Party Library
import * as jwt from 'jsonwebtoken';

// =========================================================================>> Custom Library
import { jwtConstants } from "src/app/shared/constants.jwt";
import { UserPayload } from "../interceptors/auth.interceptor";

// Model
import UserRole from "src/models/user/user_role.model";
import User from "src/models/user/user.model";

export interface UserRoleDecorator {
    roles: UserRole[];
  }
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    
    async canActivate(context: ExecutionContext) {
        const roles: number[] = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
        if (roles && roles.length > 0) {
    
            const request = context.switchToHttp().getRequest();
            const authorizationHeader = request.headers?.authorization;
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException('Authorization token is missing or not in the correct format.');
            }
    
            const token: string = authorizationHeader.split('Bearer ')[1];
            let payload: UserPayload;
    
            try {
                payload = jwt.verify(token, jwtConstants.secret) as UserPayload;
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    throw new UnauthorizedException('Authorization token is expired.');
                }
                throw new UnauthorizedException('Authorization token is invalid.');
            }
    
            const userId = payload?.user?.id;
            if (!userId) {
                throw new UnauthorizedException('User ID not found in token payload.');
            }
            const user = await User.findOne({
                where: {
                    id: userId
                },
                include: UserRole,
            });
            if (!user) {
                throw new UnauthorizedException('User not found.');
            }

            const userRoleIds = user.roles.map(role => role.role_id); // Extract role IDs from user's roles
    
            const hasRole = roles.some(role => userRoleIds.includes(role)); // Check if user has one of the required roles
            if (!hasRole) {
                throw new ForbiddenException('Access forbidden for this role.');
            }
    
            return true; // Successful authentication and authorization
        }
    
        return true; // No roles required, allow access
    }
}