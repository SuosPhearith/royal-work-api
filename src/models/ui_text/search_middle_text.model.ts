// ==================================================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

// ==================================================================================================>> Custom Library
import Language from '../language/language.model';
import SearchText from './search_text.model';

@Table({ tableName: 'search_middle_text', createdAt: 'created_at', updatedAt: 'updated_at'})
class SearchMiddleText extends Model<SearchMiddleText> {
    // =============================================================================================>> Foreign Key
    @ForeignKey(() => Language) @Column({ onDelete: 'SET NULL'})                        language_id: number;
    @ForeignKey(() => SearchText) @Column({ onDelete: 'CASCADE' })                      texts_id: number;

    // =============================================================================================>> Fields
    @Column({ allowNull: true, type: DataType.STRING(255) })                           text?: string;

    // =============================================================================================>> Many to One
    @BelongsTo(() => Language)                                                          language: Language;
    @BelongsTo(() => SearchText)                                                        searchText: SearchText;

    


}
export default SearchMiddleText;