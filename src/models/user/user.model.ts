// =========================================================================>> Third Party Library
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

// =========================================================================>> Custom Library
// Enums

// Model
import UserRole from './user_role.model';
import user_title from './user_title.model';

@Table({ tableName: 'user', createdAt: 'created_at', updatedAt: 'updated_at' })
class User extends Model<User> {

    // =============================================================>> Foreign Key
    @ForeignKey(() => user_title) @Column({ onDelete: 'CASCADE' })             user_title_id: number;

    // =============================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })                   kh_name: string;
    @Column({ allowNull: true, type: DataType.STRING(100) })                    en_name: string;
    @Column({ allowNull: true, type: DataType.STRING(100) })                    avatar: string;

    @Column({ allowNull: false, unique: true, type: DataType.STRING(100) })     phone: string;
    @Column({ allowNull: true, unique: true, type: DataType.STRING(100) })      email: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })                   password: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true  })  is_active: boolean;
    @Column({ allowNull: true, type: DataType.INTEGER })                        creator_id?: number
    @Column({ allowNull: true, type: DataType.INTEGER })                        updater_id?: number
    @Column({ allowNull: true, type: DataType.INTEGER })                        deleter_id?: number

    // =============================================================>> Many to One
    @BelongsTo(() => user_title, {as: "user_title"})                            user_title: user_title;

    // =============================================================>> One to Many
    @HasMany(() => UserRole)                                        roles: UserRole[];

}

export default User;