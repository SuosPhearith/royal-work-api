// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
import UserTitle from './user_title.model';

// =======================================================

@Table({ tableName: 'sex'})
class Sex extends Model<Sex > {

    // =============================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(30) })  kh_name: string;
    @Column({ allowNull: false, type: DataType.STRING(30) })  en_name: string;


    // =============================================================>> One to Many
    @HasMany(()=> UserTitle)                    user_titles: UserTitle[];

}

export default Sex;
