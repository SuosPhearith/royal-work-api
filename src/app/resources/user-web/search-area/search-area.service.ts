import { HttpStatus, Injectable } from '@nestjs/common';
import { SearchArea, SearchComplete } from './interface/search-area.interface';
import Docs from 'src/models/docs/docs.model';
import { Op } from 'sequelize';

@Injectable()
export class SearchAreaService {
  async getSearchArea(lang: string): Promise<SearchArea> {
    try {
      const searchAreaKh: SearchArea = {
        startText: 'ស្វែងរកឯកសារ',
        middleTexts: ['ច្បាប់', 'រាជក្រឹត', 'អនុក្រឹត', 'ផ្លូវការ'],
        endText: 'នៃព្រះរាជាណាចក្រកម្ពុជាតាំងពីឆ្នាំ ១៩៩៣',
        searchText: 'ស្វែងរកឯកសារ',
      };
      const searchAreaEn: SearchArea = {
        startText: 'Search documents',
        middleTexts: ['Law', 'Royal Decree', 'Sub-decree', 'Official'],
        endText: 'of the Kingdom of Cambodia since 1993',
        searchText: 'Search documents',
      };

      return lang === 'kh' ? searchAreaKh : searchAreaEn;
    } catch (error) {
      throw error;
    }
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
}
