// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

// ==================================================================================================>> Custom Library
import Language from '../language/language.model';

@Table({ tableName: 'search_text', createdAt: 'created_at', updatedAt: 'updated_at'})
class SearchText extends Model<SearchText> {
    // =============================================================================================>> Foreign Key
    @ForeignKey(() => Language) @Column({ onDelete: 'SET NULL'})                       language_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           start_text?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           search_text?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })                           end_text?: string;

    // =============================================================================================>> Many to One
    @BelongsTo(() => Language)                                                          language: Language;


}
export default SearchText;