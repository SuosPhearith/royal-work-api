// ===================================================================================================>> Third Party Library
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
// ===================================================================================================>> Custom Library
import UserRole from './user_role.model';
import DocsSaved from '../docs/docs_saved.model';
import DocsView from '../docs/docs_view.model';

@Table({ tableName: 'user', createdAt: 'created_at', updatedAt: 'updated_at' })
class User extends Model<User> {

    // =================================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })                   kh_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100) })                    en_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(300) })                    avatar?: string;
    @Column({ allowNull: false, unique: true, type: DataType.STRING(100) })     phone?: string;
    @Column({ allowNull: true, unique: true, type: DataType.STRING(100) })      email?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })                   password?: string;
    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true  })  is_active?: boolean;
    @Column({ allowNull: true, type: DataType.INTEGER })                        creator_id?: number

    // =================================================================================================>> One to Many
    @HasMany(() => UserRole)                                                    roles: UserRole[];
    @HasMany(() => DocsSaved)                                                   docs_saved: DocsSaved[];
    @HasMany(() => DocsView)                                                    docs_view: DocsView[];
}

export default User;