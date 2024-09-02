// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
// =========================================================================>> Custom Library
import Orgs from './orgs.model';

@Table({ tableName: 'orgs_type'})
class OrgsType extends Model<OrgsType> {

    // =====================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })    name?: string;

    // =====================================================================>> One to many 
    @HasMany(() => Orgs)                                         orgs: Orgs[];

}
export default OrgsType;