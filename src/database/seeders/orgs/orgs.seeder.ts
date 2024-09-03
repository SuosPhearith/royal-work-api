import Orgs from "../../../models/orgs/orgs.model";

export class OrgsSeeder {
    seed = async () => {
      await Orgs.bulkCreate(data.orgs);
  
      console.log(
        '\u001b[1;32m =                     Organization has been seeded. ',
      );
    };
  }
  
  // Mock-data
  const data = {
  
  
    orgs: [
      {
        // id = 1
        kh_name: 'ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ',                     
        en_name: 'MAFF',
        image_uri: 'upload/file/3952a51c-429f-4e8f-b939-14065d487c86',
      },
      {
        // id = 2
        kh_name: 'ក្រសួងបរិស្ថាន',            
        en_name: 'MoE',
        image_uri: 'upload/file/1a2163e3-ab28-413e-b83b-f603bfbb3360',
      },
      {
        // id = 3
        kh_name: 'ក្រសួងពាណិជ្ជកម្ម',            
        en_name: 'MoC',
        image_uri: 'upload/file/03203bba-dc6e-48ee-b08d-d40266f43d9e',
      },
      {
        // id = 4
        kh_name: 'ក្រុមប្រឹក្សាអភិវឌ្ឍន៍កម្ពុជា',            
        en_name: 'CDC',
        image_uri: 'upload/file/381d6523-d87b-4856-a0cf-3e6a4261a3be',
      },
      {
        // id = 5
        kh_name: 'អគ្គីសនីកម្ពុជា',            
        en_name: 'EdC',
        image_uri: 'upload/file/45b277cb-e868-4520-81ce-e2f0e54d938a',
      },
      {
        // id = 6
        kh_name: 'អគ្គនាយកដ្ឋានពន្ធដារ',            
        en_name: 'Tax',
        image_uri: 'upload/file/2c8c62b7-7dd5-4ab7-8cb2-398ed71519af',
      },
      {
        // id = 7
        kh_name: 'ក្រសួងសេដ្ឋកិច្ចនិងហិរញ្ញវត្ថុ',            
        en_name: 'MEF',
        image_uri: 'upload/file/6c996956-29ac-457f-9375-11adf3296cb3',
      },
      {
        // id = 8
        kh_name: 'ក្រសួងប្រៃណីយ៍ និងទូរគមនាគមន៍',            
        en_name: 'MPTC',
        image_uri: 'upload/file/628253df-a5ad-4cf8-a7e0-5113b44e3a11',
      },
      {
        // id = 9
        kh_name: 'ក្រសួងសាធារណៈការ និងដឹកជញ្ជូន',            
        en_name: 'MPWT',
        image_uri: 'upload/file/6f283492-4d6d-4b47-b373-696d37d78fad',
      },
      {
        // id = 10
        kh_name: 'ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ',            
        en_name: 'MLVT',
        image_uri: 'upload/file/3df8015e-d819-4619-ba59-f1271c7174d4',
      },
      {
        // id = 11
        kh_name: 'ក្រសួងទេសចរណ៍',            
        en_name: 'MoT',
        image_uri: 'upload/file/3be4af4a-c283-4356-a625-600264cbdaa6',
      },
      {
        // id = 12
        kh_name: 'ក្រសួងព័ត៏មាន',            
        en_name: 'MoI',
        image_uri: 'upload/file/ce91d5aa-8211-4760-8ebe-bf8585a31607',
      },
      {
        // id = 13
        kh_name: 'ទីស្តីការគណៈរដ្ឋមន្រ្តី',            
        en_name: 'OCM',
        image_uri: 'upload/file/053cabbc-0ff4-474d-8223-e08b9c36c23c',
      },
    ],
}