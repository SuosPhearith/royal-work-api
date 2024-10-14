import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SearchArea, SearchComplete } from './interface/search-area.interface';
import Docs from 'src/models/docs/docs.model';
import { Op } from 'sequelize';
import Language from 'src/models/language/language.model';
import SearchText from 'src/models/ui_text/search_text.model';
import SearchMiddleText from 'src/models/ui_text/search_middle_text.model';
import { UpdateSearchTextDto } from './dto/update-search-text.dto';
import { CreateSearchMiddleTextDto } from './dto/CreateSearchMiddleTextDto';
import { UpdateSearchMiddleTextDto } from './dto/UpdateSearchMiddleTextDto';

@Injectable()
export class SearchAreaService {
  async getSearchArea(lang: string = 'kh'): Promise<SearchArea> {
    try {
      // Find the language ID by its code
      const langId = await Language.findOne({ where: { code: lang } });
      if (!langId) {
        throw new Error('Language not found');
      }

      // Fetch the search text based on the language ID
      const searchText = await SearchText.findOne({
        where: { language_id: langId.id },
      });

      if (!searchText) {
        throw new Error('Search text not found');
      }

      // Fetch all middle texts related to the search text
      const searchMiddleText = await SearchMiddleText.findAll({
        where: { texts_id: searchText.id },
      });

      // Map the middle texts to extract just the `text` values
      const middleTexts = searchMiddleText.map((text) => text.text);

      // Construct the response in the expected format
      const searchArea: SearchArea = {
        startText: searchText.start_text,
        middleTexts: middleTexts,
        endText: searchText.end_text,
        searchText: searchText.search_text,
      };

      return searchArea;
    } catch (error) {
      // Handle errors appropriately
      throw new Error(`Failed to get search area: ${error.message}`);
    }
  }

  async updateSearchText(id: number, updateSearchText: UpdateSearchTextDto) {
    // Check if the ID exists in the database
    const searchText = await SearchText.findByPk(id);
    if (!searchText) {
      throw new NotFoundException(`Search text with ID ${id} not found`);
    }

    // Perform the update
    await SearchText.update(updateSearchText, {
      where: { id },
    });

    // Fetch and return the updated record
    const updatedSearchText = await SearchText.findByPk(id);

    return updatedSearchText;
  }

  async getAllSearchText() {
    // get all search text data
    const SearchTextData = await SearchText.findAll({ include: ['language'] });
    return SearchTextData;
  }

  async getAutoCompleteSearch(
    search: string,
    limit: number,
  ): Promise<SearchComplete> {
    try {
      if (!search) {
        return { data: [], statusCode: HttpStatus.OK };
      }
      const docs = await Docs.findAll({
        where: {
          title: {
            [Op.regexp]: search.split('').join('.*'),
          },
        },
        attributes: ['title', 'id'],
        limit,
      });

      return { data: docs, statusCode: HttpStatus.OK };
    } catch (error) {
      throw error;
    }
  }

  // middle text
  async createMiddleText(createSearchMiddleTextDto: CreateSearchMiddleTextDto) {
    const { texts_id, text } = createSearchMiddleTextDto;
    // is text ID
    const textId = await SearchText.findByPk(texts_id);
    if (!textId) {
      throw new NotFoundException();
    }
    // perform crate
    const middleText = await SearchMiddleText.create({
      texts_id,
      text,
      language_id: textId.language_id,
    });
    return middleText;
  }

  async getBySearchTextId(id: number) {
    // is valid ID
    const searchTextId = await SearchText.findByPk(id);
    if (!searchTextId) {
      throw new NotFoundException();
    }
    const middleTexts = SearchMiddleText.findAll({
      where: { texts_id: searchTextId.id },
    });
    return middleTexts;
  }

  async updateMiddleText(
    id: number,
    updateSearchMiddleTextDto: UpdateSearchMiddleTextDto,
  ) {
    // is valid ID
    const middleTextId = await SearchMiddleText.findByPk(id);
    if (!middleTextId) {
      throw new NotFoundException();
    }
    // perform update
    await SearchMiddleText.update(updateSearchMiddleTextDto, {
      where: { id },
    });
    return 'Updated successfully';
  }

  async deleteMiddleText(id: number) {
    // is valid ID
    const middleTextId = await SearchMiddleText.findByPk(id);
    if (!middleTextId) {
      throw new NotFoundException();
    }
    // perform delete
    await SearchMiddleText.destroy({ where: { id } });
    return 'Deteted successfully';
  }
}
