// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({ tableName: 'logo', createdAt: 'created_at', updatedAt: 'updated_at'})
class Logo extends Model<Logo> {

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           logo?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           logo_white?: string;

}
export default Logo;