// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// ==================================================================================================>> Custom Library
import Docs from '../docs/docs.model';
import OrgsType from './orgs_type.model';
import Language from '../language/language.model';

@Table({ tableName: 'orgs', createdAt: 'created_at', updatedAt: 'updated_at'})
class Orgs extends Model<Orgs> {
    // =============================================================================================>> Foreign Key
    @ForeignKey(() => OrgsType) @Column({ onDelete: 'RESTRICT', defaultValue: 5})        orgs_type_id: number;
    @ForeignKey(() => Language) @Column({ onDelete: 'SET NULL', defaultValue: 1})        language_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })            kh_name?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })            en_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(300) })             image_uri?: string;

    // =============================================================================================>> One to many
    @HasMany(() => Docs)                                                 docs: Docs[];

    // =============================================================================================>> Many to One
    @BelongsTo(() => OrgsType)                                           orgsType: OrgsType;
    @BelongsTo(() => Language)                                           language: Language;
}
export default Orgs;