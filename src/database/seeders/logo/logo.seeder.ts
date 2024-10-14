import Logo from '../../../models/logo/logo.model';

export class LogoSeeder {
  seed = async () => {
    await Logo.bulkCreate(data.logo);

    console.log('\u001b[1;32m =                     Logo has been seeded. ');
  };
}

// Mock-data
const data = {
  logo: [
    {
      logo: 'upload/file/24d9387d-ef7b-49e7-a34d-db550aadd176',
      logo_white: 'upload/file/18587f99-7f8a-498e-90df-e664592733a4',
    },
  ],
};
