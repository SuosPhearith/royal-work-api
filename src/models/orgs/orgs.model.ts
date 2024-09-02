// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// ==================================================================================================>> Custom Library
import OrgsType from './orgs_type.model';
import Docs from '../docs/docs.model';

@Table({ tableName: 'orgs'})
class Orgs extends Model<Orgs> {

    // =============================================================================================>> Foreign Keys
    @ForeignKey(()=> OrgsType) @Column({ onDelete: 'CASCADE' })          orgs_type_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })            kh_name?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })            en_name?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })            image_uri?: string;

    // =============================================================================================>> Many to one 
    @BelongsTo(() => OrgsType)                                           orgs_type: OrgsType;

    // =============================================================================================>> One to many
    @HasMany(() => Docs)                                                 docs: Docs[];
}
export default Orgs;