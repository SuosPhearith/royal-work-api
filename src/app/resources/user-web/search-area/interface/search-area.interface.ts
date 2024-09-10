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
