// =========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// =========================================================================>> Third Party Library
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

// =========================================================================>> Custom Library

// Shared
import { jwtConstants } from 'src/app/shared/constants.jwt';

// Model
import User from 'src/models/user/user.model';




// Local
import { RoleDto, UserDto } from './auth.dto';

// Interface
interface LoginPayload {
    phone: string;
    password: string;
    type: string;
}
@Injectable()
export class AuthService {

    async login(body: LoginPayload): Promise<{ access_token: string, expires_in: string, roles: RoleDto[], user: UserDto }> {
        let user: User;
        try {
            if (body.type === 'admin'){
                user = await User.findOne({
                    where: {
                        [Op.or]: [
                            { phone: body.phone },
                            { email: body.phone }
                        ],
                        is_active: true
                    },
                    attributes: ['id', 'kh_name', 'en_name', 'user_title_id', 'avatar', 'phone', 'email', 'password'],
                    include: [
                        {
                            association: 'roles',
                            attributes: ['role_id', 'user_id', 'is_default'],
                            where: {
                               role_id: 1,
                            },
                            include: [{ association: 'role', attributes: ['name', 'slug'] }],
                            order: [['id', 'ASC']]
                        },
                        {
                            association: 'user_title'
                        },
               
                    ]
                });
    
                if (!user) {
                    throw new BadRequestException('Invalid credentials');
                }
    
                const isPasswordValid = await bcrypt.compare(body.password, user.password);
                if (!isPasswordValid) {
                    throw new BadRequestException('Invalid password', 'Password Error');
                }
    
                // Manually sort roles if needed right before response
                if (user.roles) {
                    user.roles.sort((a, b) => a.role_id - b.role_id);
                }
    
                return {
                    access_token:   this._generateToken(user),
                    expires_in:     `${jwtConstants.expiresIn / 3600}h`,
                    user:           new UserDto(user),
                    roles:          this._generateRoles(user.roles)  // Now this should reflect the sorted roles
                };
            }
            if (body.type === 'user'){
                user = await User.findOne({
                    where: {
                        [Op.or]: [
                            { phone: body.phone },
                            { email: body.phone }
                        ],
                        is_active: true
                    },
                    attributes: ['id', 'kh_name', 'en_name', 'user_title_id', 'avatar', 'phone', 'email', 'password'],
                    include: [
                        {
                            association: 'roles',
                            attributes: ['role_id', 'user_id', 'is_default'],
                            where: {
                               role_id: 2,
                            },
                            include: [{ association: 'role', attributes: ['name', 'slug'] }],
                            order: [['id', 'ASC']]
                        },
                        {
                            association: 'user_title'
                        },
               
                    ]
                });
    
                if (!user) {
                    throw new BadRequestException('Invalid credentials');
                }
    
                const isPasswordValid = await bcrypt.compare(body.password, user.password);
                if (!isPasswordValid) {
                    throw new BadRequestException('Invalid password', 'Password Error');
                }
    
                // Manually sort roles if needed right before response
                if (user.roles) {
                    user.roles.sort((a, b) => a.role_id - b.role_id);
                }
    
                return {
                    access_token:   this._generateToken(user),
                    expires_in:     `${jwtConstants.expiresIn / 3600}h`,
                    user:           new UserDto(user),
                    roles:          this._generateRoles(user.roles)  // Now this should reflect the sorted roles
                };
            }
            
            
        } catch (error) {

            console.error(error);
            if (error instanceof BadRequestException) {
                throw error; // Re-throw BadRequestException
            } else {
                throw new BadRequestException('Internal server error', 'Unknown error');
            }

        }

    }

    private _generateToken(user: User): string {
        return jwt.sign({
                user: new UserDto(user),
            },
            jwtConstants.secret,
            {
                expiresIn: jwtConstants.expiresIn
            }
        );
    }

    private _generateRoles(roles: any = null): RoleDto[] {
        return roles.map(e => ({
            name: e.role.name,
            slug: e.role.slug,
            is_default: e.is_default ? 1 : 0
        })).filter(Boolean).sort((a, b) => a.role_id - b.role_id);
    }
}

