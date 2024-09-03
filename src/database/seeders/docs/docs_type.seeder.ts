import DocsType from "../../../models/docs/docs_type.model";


export class DocsTypeSeeder {
    seed = async () => {
      await DocsType.bulkCreate(data.docsType);
  
      console.log(
        '\u001b[1;32m =                     DocsType has been seeded. ',
      );
    };
  }
  
  // Mock-data
  const data = {
  
  
    docsType: [
      {   
        name: 'គោលនយោបាយ',             // id = 1
      },
      {
        name: 'របាយការណ៍',                 // id = 2
      },
      {
        name: 'ច្បាប់',                      // id = 3
      },
      {
        name: 'ប្រកាស',                    // id = 4
      },
      {
        name: 'អនុក្រឹត្យ',                   // id = 5
      },
      {
        name: 'សេចក្តីសម្រេច',               // id = 6
      },
      {
        name: 'ព្រះរាជក្រឹត្យ',                 // id = 7
      },
      {
        name: 'ព្រះរាជក្រម',                 // id = 8
      },
    ],
}