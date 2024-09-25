
import MinistryTitle from "../../../models/ui_ministry/ministry_title.model";
import MinistryLogo from "../../../models/ui_ministry/ministry_logo.model";

export class UIMinistrySeeder {
    seed = async () => {
      await MinistryTitle.bulkCreate(data.ministryTitle);
      console.log(
        '\u001b[1;32m =                     UI_MinistryTitle has been seeded. ',
      );

      await MinistryLogo.bulkCreate(data.ministryLogo);
      console.log(
        '\u001b[1;32m =                     UI_MinistryLogo has been seeded. ',
      );
    };
    };

  
  // Mock-data
  const data = {
  
    ministryTitle: [
      {   
        title: 'ក្រសួង-ស្ថាប័ន'
      },
    ],

    ministryLogo: [
      {   
        ministry_title_id: 1,
        name: 'Ministry of Agriculture, Forestry, and Fisheries',
        image: `upload/file/53feccb7-10e3-4364-979e-55d0386b5d2d`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Economy and Finance',
        image: `upload/file/ea2be358-c018-411b-b7af-11f6f705b221`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Agriculture, Forestry, and Industry',
        image: `upload/file/2b0e1cfd-961b-4e21-872d-306eb39e3220`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Mines and Energy',
        image: `upload/file/3565b347-752c-4d61-b05c-762d65f5fc36`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Commerce',
        image: `upload/file/c2a915d9-4512-4f68-8e04-5ccb99375829`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Education, Youth and Sports',
        image: `upload/file/cb0761be-b1d5-4c91-b9fd-79d333ba7eeb`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Interior',
        image: `upload/file/be235ee9-13a8-49cd-a7cd-b8b0ca6eff23`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Information',
        image: `upload/file/86b77fd5-13b9-44e7-87e7-5a89b992c757`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Posts and Telecommunications',
        image: `upload/file/3ca55015-38e1-4a56-b336-77fbdfefc2eb`,
      },
      {   
        ministry_title_id: 1,
        name: 'Ministry of Public Works and Transport',
        image: `upload/file/eec543f3-1087-4902-9d8b-cbbb5c3c820c`,
      },
      
    ],
}