// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

// =========================================================================>> Custom Library
import Docs from './docs.model';
import User from '../user/user.model';

@Table({ tableName: 'docs_editor'})
class DocsEditor extends Model<DocsEditor> {
    // ======================================================================================>> Foreign Keys
    @ForeignKey(()=> Docs) @Column({ onDelete: 'CASCADE' })         docs_id: number;
    @ForeignKey(()=> User) @Column({ onDelete: 'CASCADE' })         editor_id: number;

    // =====================================================================>> Many to one
    @BelongsTo(() => Docs)                                          docs: Docs;
    @BelongsTo(() => User)                                          editor: User;
}
export default DocsEditor;