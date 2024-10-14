// ==================================================================================================>> Third Party Library
import {
  Model,
  Column,
  Table,
  HasMany,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import MinistryLogo from './ministry_logo.model';
import Language from '../language/language.model';

@Table({
  tableName: 'ministry_title',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class MinistryTitle extends Model<MinistryTitle> {
  // =============================================================================================>> Foreign Key
  @ForeignKey(() => Language)
  @Column({ onDelete: 'SET NULL' })
  language_id: number;

  // =============================================================================================>> Fields
  @Column({ allowNull: true, type: DataType.STRING(255) }) title?: string;

  // =============================================================================================>> One to many
  @HasMany(() => MinistryLogo) ministryLogo: MinistryLogo[];
  // =============================================================================================>> Many to One
  @BelongsTo(() => Language) language: Language;
}
export default MinistryTitle;
