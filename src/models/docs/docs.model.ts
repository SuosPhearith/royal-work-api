// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, ForeignKey, BelongsTo  } from 'sequelize-typescript';
// =========================================================================>> Custom Library
import DocsType from './docs_type.model';
import FileDocs from '../file/file.model';
import Status from '../status/status.model';
import Orgs from '../orgs/orgs.model';
import User from '../user/user.model';
import DocsEditor from './docs_editor.model';
import DocsSaved from './docs_saved.model';

@Table({ tableName: 'docs'})
class Docs extends Model<Docs> {

    // ======================================================================================>> Foreign Keys
    @ForeignKey(()=> DocsType) @Column({ onDelete: 'CASCADE' })                 docs_type_id: number;
    @ForeignKey(()=> FileDocs)     @Column({ onDelete: 'CASCADE' })                 file_id: number;
    @ForeignKey(()=> Status)   @Column({ onDelete: 'CASCADE' })                 status_id: number;
    @ForeignKey(()=> Orgs)     @Column({ onDelete: 'CASCADE' })                 orgs_id: number;
    @ForeignKey(()=> User)     @Column({ onDelete: 'CASCADE' })                 creator_id: number;

    // ======================================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(300) })                   title?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })                   file_uri?: string;
    @Column({ allowNull: false, type: DataType.STRING(20) })                    extension?: string;
    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })   is_active?: boolean;

    // ======================================================================================>> Many to one
    @BelongsTo(() => DocsType)                                                  docs_type: DocsType;
    @BelongsTo(() => FileDocs)                                                  file: FileDocs;
    @BelongsTo(() => Status)                                                    status: Status;
    @BelongsTo(() => Orgs)                                                      orgs: Orgs;
    @BelongsTo(() => User)                                                      creator: User;

    // ======================================================================================>> one to Many
    @HasMany(() => DocsEditor)                                                  docs_editor: DocsEditor[];
    @HasMany(() => DocsSaved)                                                   docs_saved: DocsSaved[];
}
export default Docs;
