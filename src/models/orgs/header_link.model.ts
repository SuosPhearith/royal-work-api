// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// ==================================================================================================>> Custom Library
import OrgsType from './orgs_type.model';
import Language from '../language/language.model';

@Table({ tableName: 'header_link', createdAt: 'created_at', updatedAt: 'updated_at'})
class HeaderLink extends Model<HeaderLink> {

    // =============================================================================================>> Foreign Key
    @ForeignKey(() => Language)   @Column({ onDelete: 'SET NULL', defaultValue: 1 })    language_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                            title?: string;
    @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: false })           status?: boolean;

    // =============================================================================================>> One to many
    @HasMany(() => OrgsType)                                                            orgsType: OrgsType[];

    // =============================================================================================>> Many to One
    @BelongsTo(() => Language)                                                          language: Language;
}
export default HeaderLink;