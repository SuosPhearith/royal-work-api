
import Language from "../../../models/language/language.model";

export class LanguageSeeder {
    seed = async () => {
      await Language.bulkCreate(data.language);
  
      console.log(
        '\u001b[1;32m =                     Language has been seeded. ',
      );
    };
  }
  
  // Mock-data
  const data = {
  
    language: [
      {   
        code: 'kh',
        name: 'Khmer',
      },
      {
        code: 'en',
        name: 'English',
      },
     
    ],
}