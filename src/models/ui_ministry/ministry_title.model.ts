// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import MinistryLogo from './ministry_logo.model';


@Table({ tableName: 'ministry_title', createdAt: 'created_at', updatedAt: 'updated_at'})
class MinistryTitle extends Model<MinistryTitle> {

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           title?: string;

    // =============================================================================================>> One to many
    @HasMany(() => MinistryLogo)                                                            ministryLogo: MinistryLogo[];

}
export default MinistryTitle;