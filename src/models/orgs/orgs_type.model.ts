// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// ==================================================================================================>> Custom Library
import Orgs from './orgs.model';
import Language from '../language/language.model';
import HeaderLink from './header_link.model';

@Table({ tableName: 'orgs_type', createdAt: 'created_at', updatedAt: 'updated_at'})
class OrgsType extends Model<OrgsType> {
    // =============================================================================================>> Foreign Key
    @ForeignKey(() => HeaderLink) @Column({ onDelete: 'SET NULL' })                         header_link_id: number;
    @ForeignKey(() => Language)   @Column({ onDelete: 'SET NULL', defaultValue: 1 })        language_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(255) })                               name?: string;

    // =============================================================================================>> One to many
    @HasMany(() => Orgs)                                                                    orgs: Orgs[];

    // =============================================================================================>> Many to One
    @BelongsTo(() => HeaderLink)                                                            headerLink: HeaderLink;
    @BelongsTo(() => Language)                                                              language: Language;
}
export default OrgsType;