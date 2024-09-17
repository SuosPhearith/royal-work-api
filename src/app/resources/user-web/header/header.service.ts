import { Injectable } from '@nestjs/common';
import { HeaderDataType } from './interface/header.interface';

@Injectable()
export class HeaderService {
  async getHeader(lang: string): Promise<HeaderDataType> {
    try {
      // Create a 5-second delay using a Promise
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const linksInKhmer: HeaderDataType = {
        logo: '/images/OSF-04.png',
        logoWhite: '/images/OSF-04-white.png',
        links: [
          {
            title: 'វិស័យ',
            items: [
              {
                id: 1,
                name: 'វិស័យរដ្ឋបាលទូទៅ',
                items: [
                  { id: 1, name: 'ក្រសួងមហាផ្ទៃ', value: 121 },
                  { id: 2, name: 'ក្រសួងយុត្តិធម៌', value: 85 },
                  { id: 3, name: 'ក្រសួងការពារជាតិ', value: 90 },
                ],
              },
              {
                id: 2,
                name: 'វិស័យសុខាភិបាល',
                items: [
                  { id: 4, name: 'ក្រសួងសុខាភិបាល', value: 200 },
                  { id: 5, name: 'ក្រសួងបរិស្ថាន', value: 75 },
                ],
              },
              {
                id: 3,
                name: 'វិស័យអប់រំ',
                items: [
                  { id: 6, name: 'ក្រសួងអប់រំ យុវជន និងកីឡា', value: 150 },
                  {
                    id: 7,
                    name: 'ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ',
                    value: 130,
                  },
                ],
              },
              {
                id: 4,
                name: 'វិស័យទេសចរណ៍ និងពាណិជ្ជកម្ម',
                items: [
                  { id: 8, name: 'ក្រសួងទេសចរណ៍', value: 95 },
                  { id: 9, name: 'ក្រសួងពាណិជ្ជកម្ម', value: 110 },
                ],
              },
            ],
          },
          {
            title: 'គតិយុត្ត',
            items: [
              {
                id: 1,
                name: 'វិស័យរដ្ឋបាលទូទៅ',
                items: [
                  { id: 1, name: 'ក្រសួងមហាផ្ទៃ', value: 100 },
                  { id: 2, name: 'ក្រសួងយុត្តិធម៌', value: 85 },
                  { id: 3, name: 'ក្រសួងការពារជាតិ', value: 90 },
                ],
              },
              {
                id: 2,
                name: 'វិស័យសុខាភិបាល',
                items: [
                  { id: 4, name: 'ក្រសួងសុខាភិបាល', value: 200 },
                  { id: 5, name: 'ក្រសួងបរិស្ថាន', value: 75 },
                ],
              },
              {
                id: 4,
                name: 'វិស័យទេសចរណ៍ និងពាណិជ្ជកម្ម',
                items: [
                  { id: 8, name: 'ក្រសួងទេសចរណ៍', value: 95 },
                  { id: 9, name: 'ក្រសួងពាណិជ្ជកម្ម', value: 110 },
                ],
              },
            ],
          },
          {
            title: 'កម្មវិធីAI',
            items: [
              {
                id: 3,
                name: 'វិស័យអប់រំ',
                items: [
                  { id: 6, name: 'ក្រសួងអប់រំ យុវជន និងកីឡា', value: 150 },
                  {
                    id: 7,
                    name: 'ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ',
                    value: 130,
                  },
                ],
              },
              {
                id: 4,
                name: 'វិស័យទេសចរណ៍ និងពាណិជ្ជកម្ម',
                items: [
                  { id: 8, name: 'ក្រសួងទេសចរណ៍', value: 95 },
                  { id: 9, name: 'ក្រសួងពាណិជ្ជកម្ម', value: 110 },
                ],
              },
            ],
          },
        ],
      };

      const linksInEnglish: HeaderDataType = {
        logo: '/images/OSF-04.png',
        logoWhite: '/images/OSF-04-white.png',
        links: [
          {
            title: 'Sectors',
            items: [
              {
                id: 1,
                name: 'General Administration Sector',
                items: [
                  { id: 1, name: 'Ministry of Interior', value: 121 },
                  { id: 2, name: 'Ministry of Justice', value: 85 },
                  { id: 3, name: 'Ministry of National Defense', value: 90 },
                ],
              },
              {
                id: 2,
                name: 'Health Sector',
                items: [
                  { id: 4, name: 'Ministry of Health', value: 200 },
                  { id: 5, name: 'Ministry of Environment', value: 75 },
                ],
              },
              {
                id: 3,
                name: 'Education Sector',
                items: [
                  {
                    id: 6,
                    name: 'Ministry of Education, Youth, and Sports',
                    value: 150,
                  },
                  {
                    id: 7,
                    name: 'Ministry of Agriculture, Forestry, and Fisheries',
                    value: 130,
                  },
                ],
              },
              {
                id: 4,
                name: 'Tourism and Commerce Sector',
                items: [
                  { id: 8, name: 'Ministry of Tourism', value: 95 },
                  { id: 9, name: 'Ministry of Commerce', value: 110 },
                ],
              },
            ],
          },
          {
            title: 'Justice',
            items: [
              {
                id: 1,
                name: 'General Administration Sector',
                items: [
                  { id: 1, name: 'Ministry of Interior', value: 100 },
                  { id: 2, name: 'Ministry of Justice', value: 85 },
                  { id: 3, name: 'Ministry of National Defense', value: 90 },
                ],
              },
              {
                id: 2,
                name: 'Health Sector',
                items: [
                  { id: 4, name: 'Ministry of Health', value: 200 },
                  { id: 5, name: 'Ministry of Environment', value: 75 },
                ],
              },
              {
                id: 4,
                name: 'Tourism and Commerce Sector',
                items: [
                  { id: 8, name: 'Ministry of Tourism', value: 95 },
                  { id: 9, name: 'Ministry of Commerce', value: 110 },
                ],
              },
            ],
          },
          {
            title: 'AI Programs',
            items: [
              {
                id: 3,
                name: 'Education Sector',
                items: [
                  {
                    id: 6,
                    name: 'Ministry of Education, Youth, and Sports',
                    value: 150,
                  },
                  {
                    id: 7,
                    name: 'Ministry of Agriculture, Forestry, and Fisheries',
                    value: 130,
                  },
                ],
              },
              {
                id: 4,
                name: 'Tourism and Commerce Sector',
                items: [
                  { id: 8, name: 'Ministry of Tourism', value: 95 },
                  { id: 9, name: 'Ministry of Commerce', value: 110 },
                ],
              },
            ],
          },
        ],
      };

      return lang === 'kh' ? linksInKhmer : linksInEnglish;
    } catch (error) {
      throw error;
    }
  }
}
