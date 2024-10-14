import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import Language from 'src/models/language/language.model';
import { Op } from 'sequelize';
import FooterInfo from 'src/models/ui_text/footer_info.model';
import SearchText from 'src/models/ui_text/search_text.model';
import ListDocsText from 'src/models/ui_text/list_docs_text.model';
import MinistryTitle from 'src/models/ui_ministry/ministry_title.model';
import HeaderLink from 'src/models/orgs/header_link.model';
import DocsListUi from 'src/models/docs/docs_list_ui.model';

@Injectable()
export class LanguageService {
  // Create a new language entry
  async create(createLanguageDto: CreateLanguageDto): Promise<string> {
    // validate unique
    const isLangName = await Language.findOne({
      where: {
        name: createLanguageDto.name,
      },
    });
    if (isLangName) {
      throw new ConflictException(
        `name ${createLanguageDto.name} already exist`,
      );
    }
    const isLangCode = await Language.findOne({
      where: {
        code: createLanguageDto.code,
      },
    });
    if (isLangCode) {
      throw new ConflictException(
        `code ${createLanguageDto.code} already exist`,
      );
    }
    // create
    const lang = await Language.create(createLanguageDto);
    // create footer
    await FooterInfo.create({ language_id: lang.id });
    // create search
    await SearchText.create({ language_id: lang.id });
    // create list doc
    await ListDocsText.create({ language_id: lang.id });
    // create ministry list
    await MinistryTitle.create({ language_id: lang.id });
    // create header link
    await HeaderLink.create({ language_id: lang.id, title: 'Sector' });
    await HeaderLink.create({ language_id: lang.id, title: 'Legal' });
    // create docs list
    await DocsListUi.create({ language_id: lang.id });
    return 'created successfully';
  }

  // Find all language entries
  async findAll(): Promise<Language[]> {
    return Language.findAll();
  }

  // Find one language by ID
  async findOne(id: number): Promise<Language> {
    const language = await Language.findByPk(id);
    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found`);
    }
    return language;
  }
  // Update a language by ID with uniqueness validation
  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.findOne(id);

    // Check if a language with the same name exists (other than the current language)
    if (updateLanguageDto.name) {
      const isLangName = await Language.findOne({
        where: {
          name: updateLanguageDto.name,
          id: {
            [Op.ne]: id, // Use Op.ne for "not equal"
          },
        },
      });
      if (isLangName) {
        throw new ConflictException(
          `name ${updateLanguageDto.name} already exists`,
        );
      }
    }

    // Check if a language with the same code exists (other than the current language)
    if (updateLanguageDto.code) {
      const isLangCode = await Language.findOne({
        where: {
          code: updateLanguageDto.code,
          id: {
            [Op.ne]: id, // Use Op.ne for "not equal"
          },
        },
      });
      if (isLangCode) {
        throw new ConflictException(
          `code ${updateLanguageDto.code} already exists`,
        );
      }
    }

    // Update the language and return it
    return await language.update(updateLanguageDto);
  }

  // Delete a language by ID
  async remove(id: number): Promise<void> {
    const language = await this.findOne(id);
    // delete footer
    await FooterInfo.destroy({ where: { language_id: language.id } });
    // delete search
    await SearchText.destroy({ where: { language_id: language.id } });
    // delete list doc
    await ListDocsText.destroy({ where: { language_id: language.id } });
    // delete ministry list
    await MinistryTitle.destroy({ where: { language_id: language.id } });
    // delete header link
    await HeaderLink.destroy({ where: { language_id: language.id } });
    // delete docs list
    await DocsListUi.destroy({ where: { language_id: language.id } });
    await language.destroy();
  }
}
