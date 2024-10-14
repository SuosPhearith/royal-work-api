export interface MinistryData {
  title: string;
  logo: Ministry[];
}

export interface Ministry {
  id: number;
  name: string;
  image: string;
}

// async getMinistryData(lang: string = 'kh'): Promise<MinistryData> {
//   try {
//     const ministryData: MinistryData = {
//       title: lang === 'kh' ? 'ក្រសួង-ស្ថាប័ន' : 'Ministries and Institutions',
//       logo: [
//         {
//           id: 1,
//           name: 'Ministry of Agriculture, Forestry, and Fisheries',
//           image: `upload/file/53feccb7-10e3-4364-979e-55d0386b5d2d`,
//         },
//         {
//           id: 2,
//           name: 'Ministry of Economy and Finance',
//           image: `upload/file/ea2be358-c018-411b-b7af-11f6f705b221`,
//         },
//         {
//           id: 3,
//           name: 'Ministry of Agriculture, Forestry, and Industry',
//           image: `upload/file/2b0e1cfd-961b-4e21-872d-306eb39e3220`,
//         },
//         {
//           id: 4,
//           name: 'Ministry of Mines and Energy',
//           image: `upload/file/3565b347-752c-4d61-b05c-762d65f5fc36`,
//         },
//         {
//           id: 5,
//           name: 'Ministry of Commerce',
//           image: `upload/file/c2a915d9-4512-4f68-8e04-5ccb99375829`,
//         },
//         {
//           id: 6,
//           name: 'Ministry of Environment',
//           image: `upload/file/86edd88f-82ad-4f67-8297-6defcc076365`,
//         },
//         {
//           id: 7,
//           name: 'Ministry of Education, Youth and Sports',
//           image: `upload/file/cb0761be-b1d5-4c91-b9fd-79d333ba7eeb`,
//         },
//         {
//           id: 8,
//           name: 'Ministry of Interior',
//           image: `upload/file/be235ee9-13a8-49cd-a7cd-b8b0ca6eff23`,
//         },
//         {
//           id: 9,
//           name: 'Ministry of Information',
//           image: `upload/file/86b77fd5-13b9-44e7-87e7-5a89b992c757`,
//         },
//         {
//           id: 10,
//           name: 'Ministry of Tourism',
//           image: `upload/file/b1f19089-77ca-4b18-b770-1987fcc84e69`,
//         },
//         {
//           id: 11,
//           name: 'Ministry of Posts and Telecommunications',
//           image: `upload/file/3ca55015-38e1-4a56-b336-77fbdfefc2eb`,
//         },
//         {
//           id: 12,
//           name: 'Ministry of Public Works and Transport',
//           image: `upload/file/eec543f3-1087-4902-9d8b-cbbb5c3c820c`,
//         },
//       ],
//     };
//     return ministryData;
//   } catch (error) {
//     throw error;
//   }
// }
