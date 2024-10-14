import Docs from 'src/models/docs/docs.model';

export interface SearchArea {
  startText: string;
  middleTexts: string[];
  endText: string;
  searchText: string;
}

export interface SearchComplete {
  data: Docs[];
  statusCode: number;
}

// async getSearchArea(lang: string = 'kh'): Promise<any> {
//   try {
//     const searchAreaKh: SearchArea = {
//       startText: 'ស្វែងរកឯកសារ',
//       middleTexts: ['ច្បាប់', 'រាជក្រឹត', 'អនុក្រឹត', 'ផ្លូវការ'],
//       endText: 'នៃព្រះរាជាណាចក្រកម្ពុជាតាំងពីឆ្នាំ ១៩៩៣',
//       searchText: 'ស្វែងរកឯកសារ',
//     };
//     const searchAreaEn: SearchArea = {
//       startText: 'Search documents',
//       middleTexts: ['Law', 'Royal Decree', 'Sub-decree', 'Official'],
//       endText: 'of the Kingdom of Cambodia since 1993',
//       searchText: 'Search documents',
//     };
//     return lang === 'kh' ? searchAreaKh : searchAreaEn;
//   } catch (error) {
//     throw error;
//   }
// }
