// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
import Docs from './docs.model';

// =========================================================================>> Custom Library

@Table({ tableName: 'docs_type'})
class DocsType extends Model<DocsType> {

    // =====================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(50) })  name?: string;

    // =====================================================================>> One to many 
    @HasMany(() => Docs)                                      docs: Docs[];
}
export default DocsType;