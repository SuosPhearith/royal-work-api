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
        file_uri: 'upload/file/6ed3be79-9d9a-4b95-b1c7-93b5ba902201',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 7,
        file_id: 2,
        orgs_id: 13,
        creator_id: 5,
        title: 'ព្រះរាជក្រឹត្យស្តីពីការបង្កើតរាជមណ្ឌិត្យសភាកម្ពុជា ជាគ្រឹះស្ថានសាធារណៈរដ្ឋបាល',
        file_uri: 'upload/file/41ed21d9-db8d-4e87-81cc-85481467d4fb',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 7,
        file_id: 2,
        orgs_id: 13,
        creator_id: 5,
        title: 'ព្រះរាជក្រឹត្យលេខ នស/រកត/១១២៣/២៣៨១ ចុះថ្ងៃទី២ ខែវិច្ឆិកា ឆ្នាំ២០២៣ ស្តីពីការបង្កើត ការរៀបចំ និងកិច្ចដំណើរការរបស់អាជ្ញាធរជាតិដោះស្រាយវិវាទក្រៅប្រព័ន្ធតុលាការ',
        file_uri: 'upload/file/49ab2e86-6e2b-494c-96b3-f50810a299ed',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 1,
        file_id: 2,
        orgs_id: 4,
        creator_id: 5,
        title: 'ក្របខណ្ឌគោលនយោបាយសេដ្ឋកិច្ច និងសង្គមឌីជីថលកម្ពុជា ២០២១-២០៣៥',
        file_uri: 'upload/file/3b06b8c6-fb69-47a2-987c-613751e3e9e0',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 3,
        file_id: 2,
        orgs_id: 7,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពីហិរញ្ញវត្ថុសម្រាប់ការគ្រប់គ្រងឆ្នាំ២០២០',
        file_uri: 'upload/file/34e862cb-346f-4390-883c-8f93a6568278',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 8,
        file_id: 2,
        orgs_id: 3,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពី ពាណិជ្ជកម្មតាមប្រព័ន្ធអេឡិចត្រូនិក',
        file_uri: 'upload/file/d53589ef-7bc3-473c-b046-18eb40aabee4',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 8,
        file_id: 2,
        orgs_id: 3,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពី កិច្ចការពារអ្នកប្រើប្រាស់',
        file_uri: 'upload/file/4c0d64ff-60ae-4c11-abb1-dc88c0e1e36e',
        extension: 'pdf',
        is_active: true,
      },
      {
        docs_type_id: 8,
        file_id: 2,
        orgs_id: 10,
        creator_id: 5,
        title: 'ច្បាប់ស្តីពី របបសន្តិសុខសង្គម',
        file_uri: 'upload/file/92a9277a-b091-4a9e-9a22-1d6ae37ea450',
        extension: 'pdf',
        is_active: true,
      },
    ],
}