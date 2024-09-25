// =========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

// =========================================================================>> Custom Library
import Docs from './docs.model';
import User from '../user/user.model';

@Table({ tableName: 'docs_view', createdAt: 'created_at', updatedAt: 'updated_at'})
class DocsView extends Model<DocsView> {
    // ======================================================================================>> Foreign Keys
    @ForeignKey(()=> Docs) @Column({ onDelete: 'CASCADE' })         docs_id: number;
    @ForeignKey(()=> User) @Column({ onDelete: 'CASCADE' })         user_id: number;

    // =====================================================================>> Many to one
    @BelongsTo(() => Docs)                                          docs: Docs;
    @BelongsTo(() => User)                                          user: User;
}
export default DocsView;