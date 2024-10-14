// ==================================================================================================>> Third Party Library
import {
  Model,
  Column,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
// ==================================================================================================>> Custom Library
import Language from '../language/language.model';

@Table({
  tableName: 'docs_list_ui',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class DocsListUi extends Model<DocsListUi> {
  // =============================================================================================>> Foreign Key
  @ForeignKey(() => Language)
  @Column({ onDelete: 'SET NULL', defaultValue: 1 })
  language_id: number;

  // =============================================================================================>> Fields
  @Column({ allowNull: true, type: DataType.STRING(255) }) new_text?: string;
  @Column({ allowNull: true, type: DataType.STRING(255) })
  important_text?: string;
  @Column({ allowNull: true, type: DataType.STRING(255) }) all_text?: string;

  // =============================================================================================>> Many to One
  @BelongsTo(() => Language) language: Language;
}
export default DocsListUi;
