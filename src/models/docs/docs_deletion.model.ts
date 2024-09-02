// =========================================================================>> Third Party Library
import { Model, Column, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// =========================================================================>> Custom Library
import User from '../user/user.model';
import DocsType from './docs_type.model';
import Status from '../status/status.model';
import Orgs from '../orgs/orgs.model';
import FileDocs from '../file/file.model';

@Table({ tableName: 'docs_deletion'})
class DocsDeletion extends Model<DocsDeletion> {

    // ======================================================================================>> Foreign Keys
    @ForeignKey(()=> User)     @Column({ onDelete: 'CASCADE' })                 deleter_id: number;
    @ForeignKey(()=> DocsType) @Column({ onDelete: 'CASCADE' })                 docs_type_id: number;
    @ForeignKey(()=> FileDocs) @Column({ onDelete: 'CASCADE' })                 file_id: number;
    @ForeignKey(()=> Status)   @Column({ onDelete: 'CASCADE' })                 status_id: number;
    @ForeignKey(()=> Orgs)     @Column({ onDelete: 'CASCADE' })                 orgs_id: number;
    @ForeignKey(()=> User)     @Column({ onDelete: 'CASCADE' })                 creator_id: number;

    // ======================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(350) })                   title?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })                   file_uri?: string;
    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })  is_active?: boolean;

    // =====================================================================================>> Many to one
    @BelongsTo(() => User)                                                      deleter: User;
    @BelongsTo(() => DocsType)                                                  docs_type: DocsType;
    @BelongsTo(() => FileDocs)                                                  file: FileDocs;
    @BelongsTo(() => Status)                                                    status: Status;
    @BelongsTo(() => Orgs)                                                      orgs: Orgs;
    @BelongsTo(() => User)                                                      creator: User;
}
export default DocsDeletion;
//?Note: This table is used to store deleted docs. So users can restore their deleted docs in some cases.
//To avoid memory overload, it can be set time out to delete automatically after specific time or duration in case it's not restored.