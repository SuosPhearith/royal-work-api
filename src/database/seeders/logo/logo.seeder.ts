
import Logo from "../../../models/logo/logo.model";

export class LogoSeeder {
    seed = async () => {
      await Logo.bulkCreate(data.logo);
  
      console.log(
        '\u001b[1;32m =                     Logo has been seeded. ',
      );
    };
  }
  
  // Mock-data
  const data = {
  
    logo: [
      {   
        logo: '/images/OSF-04.png',
        logo_white: '/images/OSF-04-white.png',
      },
     
    ],
}