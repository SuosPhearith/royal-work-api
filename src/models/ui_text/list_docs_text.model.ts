// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

// ==================================================================================================>> Custom Library
import Language from '../language/language.model';

@Table({ tableName: 'list_docs_text', createdAt: 'created_at', updatedAt: 'updated_at'})
class ListDocsText extends Model<ListDocsText> {
    // =============================================================================================>> Foreign Key
    @ForeignKey(() => Language) @Column({ onDelete: 'SET NULL' })                      language_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           home_page?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           current_page?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           search_placeholder?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           docs_id_label?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           title_label?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           download_label?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           previous_label?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           next_label?: string;

    // =============================================================================================>> Many to One
    @BelongsTo(() => Language)                                                          language: Language;

}
export default ListDocsText;