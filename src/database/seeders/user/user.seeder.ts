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
      avatar: 'upload/file/32c06974-f6ff-4992-915d-640f05a44f26',
      phone: '012131415',
      password: 'H1X9ch',
      is_active: true,
    },
    {
      kh_name: 'ចាន់ សុវ៉ាន់ណែត',        // id = 2
      en_name: 'Chan Suvannet', 
      avatar: 'upload/file/616d22f4-55aa-4c59-ba8a-8bf026766c18',
      phone: '012493744',
      password: 'sAF5y9',
      is_active: true,
    },

    // ====================================================>> Super Admin
    {
      kh_name: 'ហុី ជិន',                // id = 3
      en_name: 'Hy Chin', 
      avatar: 'upload/file/ffe83653-ea2e-4ebf-823c-9f24f67d32eb',
      phone: '012927424',
      password: 'otyTX8',
      is_active: true,
    },
    {
      kh_name: 'ឌី រ៉ុងរ៉ាត់',              // id = 4
      en_name: 'Dy Rongrath', 
      avatar: 'upload/file/e81c48ed-a480-4c85-9c12-9f59b0db9047',
      phone: '012083552',
      password: '9Hbfs2',
      is_active: true,
    },
    {
      kh_name: 'កប​ ដាវឹន',              // id = 5
      en_name: 'Korb Daven', 
      avatar: 'upload/file/36882782-eae1-42cc-baea-bcf4fe429ef7',
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
      added_by_id: 3,
    },
    {
      user_id: 2,
      role_id: 2,
      is_default: true,
      added_by_id: 3,
    },
    {
      user_id: 3,
      role_id: 1,
      is_default: true,
      added_by_id: 4,
    },
    {
      user_id: 3,
      role_id: 2,
      is_default: true,
      added_by_id: 4,
    },
    {
      user_id: 4,
      role_id: 1,
      is_default: true,
      added_by_id: 5,
    },
    {
      user_id: 4,
      role_id: 2,
      is_default: true,
      added_by_id: 5,
    },
    {
      user_id: 5,
      role_id: 1,
      is_default: true,
      added_by_id: 5,
    },
    {
      user_id: 5,
      role_id: 2,
      is_default: true,
      added_by_id: 5,
    },

  ],
};
