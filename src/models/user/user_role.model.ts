// =========================================================================>> Third Party Library
import { Model, Column, Table, ForeignKey, BelongsTo, DataType  } from 'sequelize-typescript';

// =========================================================================>> Custom Library
import User from './user.model';
import Role from './role.model';

@Table({ tableName: 'user_roles', createdAt: 'created_at', updatedAt: 'updated_at'})
class UserRole extends Model<UserRole> {

    // =============================================================>> Foreign Key
    @ForeignKey(() => User) @Column({ onDelete: 'CASCADE' })                        user_id: number;
    @ForeignKey(() => Role) @Column({ onDelete: 'CASCADE' })                        role_id: number;
    @ForeignKey(() => User) @Column({ onDelete: 'CASCADE' })                        added_by_id: number;


    // =============================================================>> Field
    @Column({ allowNull: true, type: DataType.INTEGER })                            added_at?: number;
    @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: false })       is_default?: boolean;
    
    // =============================================================>> Many to One
    @BelongsTo(() => Role)                                  role: Role;
    @BelongsTo(() => User)                                  user: User;
    @BelongsTo(() => User, { foreignKey: 'added_by_id' })   creator: User;

}

export default UserRole;