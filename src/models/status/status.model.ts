// ============================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
import Docs from '../docs/docs.model';

// ============================================================================>> Custom Library

@Table({ tableName: 'status'})
class Status extends Model<Status> {

    // =======================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(50) })  name?: string;
    @Column({ allowNull: false, type: DataType.STRING(50) })  color?: string;

    // =======================================================================>> One to many
    @HasMany(() => Docs)                                      docs: Docs[];                      
}
export default Status;