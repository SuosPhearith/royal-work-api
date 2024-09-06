import * as bcrypt from 'bcryptjs';

import Role from '../../../models/user/role.model';
import User from '../../../models/user/user.model';
import UserRole from '../../../models/user/user_role.model';

export class UserSeeder {
  seed = async () => {
    await Role.bulkCreate(data.roles);

    for (const row of data.users) {
      row.password = await bcrypt.hash(row.password, 10);
    };
    await User.bulkCreate(data.users);
    await UserRole.bulkCreate(data.userRoles);

    console.log(
      '\u001b[1;32m =                     User has been seeded. ',
    );
  };
}

// Mock-data
const data = {


  roles: [
    {
      name: 'អភិបាលប្រព័ន្ធ',            // id = 1
      slug: 'SuperAdmin',
    },
    {
      name: 'អ្នកប្រើប្រាស់',              // id = 2
      slug: 'User',
    },
  ],


  users: [
    // ====================================================>> User
    {
      kh_name: 'ឆាង ឈីត',             // id = 1
      en_name: 'Chharng Chhit', 
      avatar: 'upload/file/bf8be0fb-38a1-489b-8574-4c6698debf18',
      phone: '012131415',
      password: 'H1X9ch',
      is_active: true,
    },
    {
      kh_name: 'ជ​ ណារិន',        // id = 2
      en_name: 'Chor Narin', 
      avatar: 'upload/file/46e4edb2-6816-4147-87ed-21202f7344ff',
      phone: '012493744',
      password: 'sAF5y9',
      is_active: true,
    },
    {
      kh_name: 'បុិច​ តារាផល',        // id = 3
      en_name: 'Pich Daraphal', 
      avatar: 'upload/file/b4c234e0-75c4-4615-b824-0d054bc94e9b',
      phone: '012493663',
      password: 'sZC5y1',
      is_active: true,
    },

    // ====================================================>> Super Admin
    {
      kh_name: 'ហុី ជិន',                // id = 4
      en_name: 'Hy Chin', 
      avatar: 'upload/file/7faa78c2-2c66-4888-9dc7-8ce5260d2195',
      phone: '012927424',
      password: 'otyTX8',
      is_active: true,
    },
    {
      kh_name: 'ឌី រ៉ុងរ៉ាត់',              // id = 5
      en_name: 'Dy Rongrath', 
      avatar: 'upload/file/5c4a66f8-13f4-4013-a06f-65a1615eead5',
      phone: '012083552',
      password: '9Hbfs2',
      is_active: true,
    },
    {
      kh_name: 'កប​ ដាវឹន',              // id = 6
      en_name: 'Korb Daven', 
      avatar: 'upload/file/2f4e7bfa-f843-4a8d-8c3c-4d2648f8eaad',
      phone: '012345678',
      password: '1X9kdv',
      is_active: true,
    },
    
  ],

  userRoles: [
    // =============================================>> User
    {
      user_id: 1,
      role_id: 2,
      is_default: true,
    },
    {
      user_id: 2,
      role_id: 2,
      is_default: true,
    },
    {
      user_id: 3,
      role_id: 2,
      is_default: true,
    },
    // =============================================>> Superadmin
    {
      user_id: 4,
      role_id: 1,
      is_default: true,
    },
    {
      user_id: 4,
      role_id: 2,
      is_default: true,
    },
    {
      user_id: 5,
      role_id: 1,
      is_default: true,
    },
    {
      user_id: 5,
      role_id: 2,
      is_default: true,
    },
    {
      user_id: 6,
      role_id: 1,
      is_default: true,
    },
    {
      user_id: 6,
      role_id: 2,
      is_default: true,
    },
  ],
};
