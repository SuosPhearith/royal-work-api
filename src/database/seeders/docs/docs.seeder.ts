import Docs from "../../../models/docs/docs.model";


export class DocsSeeder {
    seed = async () => {
      await Docs.bulkCreate(data.docs);
  
      console.log(
        '\u001b[1;32m =                     Docs has been seeded. ',
      );
    };
  }
  
  // Mock-data
  const data = {
  
  
    docs: [
      {   
        docs_type_id: 7,
        file_id: 2,
        orgs_id: 13,
        creator_id: 5,
        title: 'ព្រះរាជក្រឹត្យស្តីពីការរៀបចំនិងកាប្រព្រឹត្តទៅរបស់អគ្គលេខាធិការដ្ឋាននៃគណៈកម្មាធិការជាតិគ្រប់គ្រងគ្រោះមហន្តរាយ',
        file_uri: 'upload/file/d3dfbf83-249d-47ed-8ee5-4a8e65be8308',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 7,
        file_id: 2,
        orgs_id: 13,
        creator_id: 5,
        title: 'ព្រះរាជក្រឹត្យស្តីពីការបង្កើតរាជមណ្ឌិត្យសភាកម្ពុជា ជាគ្រឹះស្ថានសាធារណៈរដ្ឋបាល',
        file_uri: 'upload/file/a1f6e520-9177-4649-b059-9bf475ac4d42',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 7,
        file_id: 2,
        orgs_id: 13,
        creator_id: 5,
        title: 'ព្រះរាជក្រឹត្យលេខ នស/រកត/១១២៣/២៣៨១ ចុះថ្ងៃទី២ ខែវិច្ឆិកា ឆ្នាំ២០២៣ ស្តីពីការបង្កើត ការរៀបចំ និងកិច្ចដំណើរការរបស់អាជ្ញាធរជាតិដោះស្រាយវិវាទក្រៅប្រព័ន្ធតុលាការ',
        file_uri: 'upload/file/424c9f78-f263-4171-9b56-5a51f74e6afd',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 1,
        file_id: 2,
        orgs_id: 4,
        creator_id: 5,
        title: 'ក្របខណ្ឌគោលនយោបាយសេដ្ឋកិច្ច និងសង្គមឌីជីថលកម្ពុជា ២០២១-២០៣៥',
        file_uri: 'upload/file/b6078701-8bfc-481c-8dd5-15e2dc1bbd9e',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 3,
        file_id: 2,
        orgs_id: 7,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពីហិរញ្ញវត្ថុសម្រាប់ការគ្រប់គ្រងឆ្នាំ២០២០',
        file_uri: 'upload/file/cb10d06e-51cc-475b-8316-bb80aa1265ab',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 8,
        file_id: 2,
        orgs_id: 3,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពី ពាណិជ្ជកម្មតាមប្រព័ន្ធអេឡិចត្រូនិក',
        file_uri: 'upload/file/f6583e5b-cedd-4ff1-bdb5-c803fc8c6996',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 8,
        file_id: 2,
        orgs_id: 3,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពី កិច្ចការពារអ្នកប្រើប្រាស់',
        file_uri: 'upload/file/05ce029f-2c21-496a-9b1d-7a6f0d7261ac',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 8,
        file_id: 2,
        orgs_id: 10,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពី របបសន្តិសុខសង្គម',
        file_uri: 'upload/file/0cdd76b9-97af-4f6b-9cdc-96bccedc38bd',
        extension: 'pdf',
        is_active: true,
      },
    ],
}