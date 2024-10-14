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
// ==================================================================================================>> Custom Library
import OrgsType from '../orgs/orgs_type.model';
import HeaderLink from '../orgs/header_link.model';
import Orgs from '../orgs/orgs.model';
import SearchText from '../ui_text/search_text.model';
import SearchMiddleText from '../ui_text/search_middle_text.model';
import ListDocsText from '../ui_text/list_docs_text.model';
import FooterInfo from '../ui_text/footer_info.model';
import MinistryTitle from '../ui_ministry/ministry_title.model';

@Table({
  tableName: 'language',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class Language extends Model<Language> {
  // =============================================================================================>> Fields
  @Column({ allowNull: false, type: DataType.STRING(10) }) code?: string;
  @Column({ allowNull: false, type: DataType.STRING(50) }) name?: string;

  // =============================================================================================>> One to many
  @HasMany(() => HeaderLink) headerLink: HeaderLink[];
  @HasMany(() => OrgsType) orgsType: OrgsType[];
  @HasMany(() => Orgs) orgs: Orgs[];
  @HasMany(() => SearchText) searchText: SearchText[];
  @HasMany(() => SearchMiddleText) searchMiddleText: SearchMiddleText[];
  @HasMany(() => ListDocsText) listDocsText: ListDocsText[];
  @HasMany(() => FooterInfo) footerInfo: FooterInfo[];
  @HasMany(() => MinistryTitle) ministryTitle: MinistryTitle[];
}
export default Language;
