export interface EachDocumentKeyDataType {
  title: string;
  seeAll: string;
  docKeys: DocumentKey[];
}

export interface DocumentKey {
  id: number;
  title: string;
  file_uri: string;
  extension: string;
  created_at: string;
  markbook: boolean;
  org: Orgs;
  docs_type: DocumentType;
}

export interface Orgs {
  image_uri: string;
  name: string;
}

export interface DocumentType {
  id: number;
  name: string;
}
