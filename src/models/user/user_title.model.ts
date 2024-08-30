// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

// =========================================================================>> Custom Library
import User from './user.model';
import Sex from './sex.model';

@Table({ tableName: 'user_title'})
class UserTitle extends Model<UserTitle > {
    @ForeignKey(()=> Sex) @Column({ onDelete: 'CASCADE' })     sex_id: number;

    // =============================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })  name: string;

    // =============================================================>> Many to One
    @BelongsTo(() => Sex)                           sex: Sex;

    // =============================================================>> One to Many
    @HasMany(() => User)                            users: User[];

}

export default UserTitle ;