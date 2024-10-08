// =========================================================================>> Core Library
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
// =========================================================================>> Third Party Library
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs";
// =========================================================================>> Custom Library
import User from "src/models/user/user.model";

export interface UserPayload {
    user: User,
    role: string,
    type: string,
    iat: number
    exp: number
}
export class AuthInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const token: string | null = request.headers?.authorization ? request.headers?.authorization.split('Bearer ')[1] : null;
        const payload: UserPayload | null = jwt.decode(token) as UserPayload | null;
        request.user = payload?.user ?? null;
        return next.handle()
    }
}