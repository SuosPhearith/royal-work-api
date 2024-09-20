// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// ==================================================================================================>> Custom Library
import Docs from '../docs/docs.model';

@Table({ tableName: 'orgs', createdAt: 'created_at', updatedAt: 'updated_at'})
class Orgs extends Model<Orgs> {

    // =============================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })            kh_name?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })            en_name?: string;
    @Column({ allowNull: false, type: DataType.STRING(300) })            image_uri?: string;

    // =============================================================================================>> One to many
    @HasMany(() => Docs)                                                 docs: Docs[];
}
export default Orgs;