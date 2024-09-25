// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

// ==================================================================================================>> Custom Library
import MinistryTitle from './ministry_title.model';

@Table({ tableName: 'ministry_logo', createdAt: 'created_at', updatedAt: 'updated_at'})
class MinistryLogo extends Model<MinistryLogo> {

    // =============================================================================================>> Foreign Key
    @ForeignKey(() => MinistryTitle) @Column({ onDelete: 'SET NULL' })                 ministry_title_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           name?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           image?: string;

    // =============================================================================================>> Many to One
    @BelongsTo(() => MinistryTitle)                                                    ministryTitle: MinistryTitle;


}
export default MinistryLogo;