// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';

// =========================================================================>> Custom Library
import UserRole from './user_role.model';

@Table({ tableName: 'role'})
class Role extends Model<Role> {

    // =============================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(50) })  name: string;
    @Column({ allowNull: false, type: DataType.STRING(50) })  slug: string;

    // =============================================================>> One to Many
    @HasMany(() => UserRole)     roles: UserRole[];

}
export default Role;