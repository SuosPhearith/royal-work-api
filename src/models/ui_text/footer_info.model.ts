// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

// ==================================================================================================>> Custom Library
import Language from '../language/language.model';

@Table({ tableName: 'footer_info', createdAt: 'created_at', updatedAt: 'updated_at'})
class FooterInfo extends Model<FooterInfo> {
    // =============================================================================================>> Foreign Key
    @ForeignKey(() => Language) @Column({ onDelete: 'SET NULL' })                      language_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           logo?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           description?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           contact?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           email?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           location?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           copyright?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           facebook_link?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           telegram_link?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           youtube_link?: string;

    // =============================================================================================>> Many to One
    @BelongsTo(() => Language)                                                          language: Language;

}
export default FooterInfo;