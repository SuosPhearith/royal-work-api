// =========================================================================>> Core Library
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

// =========================================================================>> Third Party Library
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { FileService } from 'src/app/services/file.service';
import Role from 'src/models/user/role.model';

// =========================================================================>> Custom Library

// Model
import User from 'src/models/user/user.model';
import UserRole from 'src/models/user/user_role.model';

@Injectable()
export class ProfileService {

    constructor(private fileService: FileService){}

    async read(UserId: number): Promise<any> {
        try {
            const user = await User.findByPk(UserId,{
                attributes: ['id', 'kh_name', 'en_name', 'avatar', 'phone', 'email', 'is_active', 'created_at', 'updated_at'],
                include: [
                    {
                        model: UserRole,
                        attributes: ['id'],
                        include:[
                            {
                                model: Role,
                                attributes: ['id', 'name', 'slug'],
                            }
                        ]
                    }
                ],
                order: [['id', 'ASC']]
            });

            const roles = await Role.findAll({
                attributes: ['id', 'name', 'slug'],
                order: [['id', 'ASC']]
            });

            if (user && user.roles) {
                // Sort the roles by the role id
                user.roles = user.roles.sort((a, b) => a.role.id - b.role.id);
            }
  
            const data = {user, roles}

            return{
                data
            }
        } catch (error) {
            throw new Error();
        }

    }

    //==================================================================>> Update Profile
    async updateProfile(body: any, id: number): Promise<any> {
        try {

            const check_phone = await User.findOne({ where: { 
                phone: body.phone,
                id: { [Op.ne]: id }  // Exclude the current user by id

            }});
            if(check_phone){
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `User with phone ${body.phone} already exists.`,
                }
            }
            if (body.email && body.email != "") {
                const check_email = await User.findOne({ where: { 
                    email: body.email,
                    id: { [Op.ne]: id }  // Exclude the current user by id
                } });
                if(check_email){
                    return {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: `User with email ${body.email} already exists.`,
                    }
                }
            }
            // Protect error from frontend!
            if (body.email == "") {
                body.email = null;
            }
            if (body.en_name == "") {
                body.en_name = null;
            }

            if (body.avatar) {
                const result = await this.fileService.uploadBase64Image('User', body.avatar);
                if (result.error) {
                    throw new BadRequestException(result.error);
                }
                body.avatar = result.file.uri;
            }
            
    
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('user not found');
            }

            const updateData: any = {
                    kh_name: body.kh_name,
                    en_name: body.en_name,
                    phone: body.phone,
                    email: body.email,
            };

            // Include avatar only if it's not null
            if (body.avatar) {
                updateData.avatar = body.avatar;
            }
    
            await user.update(updateData);

            // Update the user's role in the UserRole table
            const userRole = await UserRole.findOne({
                where: { user_id: id },
            });

            if (userRole) {
                const newRoleId = Number(body.role_id);
                if (newRoleId < 1 || newRoleId > 2) {
                    throw new Error('Invalid role ID');
                  }
                
                  // Step 1: Remove all existing roles for the user
                  await UserRole.destroy({ where: { user_id: id } });
                
                  // Step 2: Determine roles to add (new role and all lower roles)
                  const rolesToAdd = Array.from({ length: 3 - newRoleId }, (_, index) => newRoleId + index);
                
                  // Step 3: Assign new roles
                  const rolesToInsert = rolesToAdd.map(roleId => ({
                    user_id: id,
                    role_id: roleId, 
                  }));
                  await UserRole.bulkCreate(rolesToInsert);

            } else{
                
                const newRoleId = Number(body.role_id);
                if (newRoleId < 1 || newRoleId > 2) {
                    throw new Error('Invalid role ID');
                  }

                  const rolesToAdd = Array.from({ length: 3 - newRoleId }, (_, index) => newRoleId + index);
                
                  const rolesToInsert = rolesToAdd.map(roleId => ({
                    user_id: id,
                    role_id: roleId,
                  }));

                  await UserRole.bulkCreate(rolesToInsert);
            }

            const res_user = await User.findByPk(id,{
                attributes: ['id', 'kh_name', 'en_name', 'phone', 'email', 'avatar', 'is_active', 'created_at','updated_at'], 
                include: [
                    {
                        model: UserRole,
                        attributes: ['role_id']
                    },
                ]
            }
                
            );
    
            return {
                status: 'success',
                message: "កែប្រែដោយជោគជ័យ",
                res_user
            }

        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    //==================================================================>> Update Password
    async updatePassword(body: any, userId:number): Promise<any> {
        try {
                const user = await User.findByPk(userId);
    
                if (!user) {
                    throw new BadRequestException('User Not Found!');
                }

                // Check if the new password matches the confirmation password
                if (body.new_password !== body.confirm_password) {
                    throw new BadRequestException('New password and confirmation password do not match');
                }
    
                const isPasswordValid = await bcrypt.compare(body.old_password, user.password);
                if (!isPasswordValid) {
                    throw new BadRequestException('Invalid password', 'Password Error');
                }

                // Hash the new password
                const hashedPassword = await bcrypt.hash(body.new_password, 10);

                await user.update({
                    password: hashedPassword
                });

                return{
                    status: 'success',
                    message: "លេខសម្ងាត់បានកែប្រែដោយជោគជ័យ",
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
}