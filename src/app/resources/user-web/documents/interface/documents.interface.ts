export interface EachDocumentKeyDataType {
  title: string;
  seeAll: string;
  docKeys: DocumentKey[];
}

export interface DocumentKey {
  id: number;
  title: string;
  file_uri: string;
  image_uri: string;
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

// async getDocuments(lang: string): Promise<any> {
//   const getNewDocs = await Docs.findAll({
//     limit: 10,
//     where: { is_active: true },
//     order: [['created_at', 'DESC']],
//     include: [
//       { model: DocsType, attributes: ['id', 'name'] },
//       { model: Orgs, attributes: ['kh_name', 'en_name', 'image_uri'] },
//     ],
//   });
//   const newDocsData: EachDocumentKeyDataType = {
//     title: lang === 'kh' ? 'ឯកសារថ្មីៗ' : 'New Documents',
//     seeAll: lang === 'kh' ? 'ទាំងអស់' : 'See all',
//     docKeys: getNewDocs.map((doc: any) => ({
//       id: doc.id,
//       title: doc.docs_type.name,
//       file_uri: doc.file_uri,
//       extension: doc.extension,
//       created_at: doc.created_at,
//       markbook: false,
//       org: {
//         image_uri: doc.orgs.image_uri,
//         name: lang === 'kh' ? doc.orgs.kh_name : doc.orgs.en_name,
//       },
//       docs_type: {
//         id: doc.docs_type.id,
//         name: doc.docs_type.name,
//       },
//     })),
//   };
//   const mianDocsData: EachDocumentKeyDataType = {
//     title: lang === 'kh' ? 'ឯកសារសំខាន់ៗ' : 'Important documents',
//     seeAll: lang === 'kh' ? 'ទាំងអស់' : 'See all',
//     docKeys: getNewDocs.map((doc: any) => ({
//       id: doc.id,
//       title: doc.docs_type.name,
//       file_uri: doc.file_uri,
//       extension: doc.extension,
//       created_at: doc.created_at,
//       markbook: false,
//       org: {
//         image_uri: doc.orgs.image_uri,
//         name: lang === 'kh' ? doc.orgs.kh_name : doc.orgs.en_name,
//       },
//       docs_type: {
//         id: doc.docs_type.id,
//         name: doc.docs_type.name,
//       },
//     })),
//   };

//   return [newDocsData, mianDocsData];
// }
