import { Injectable } from '@nestjs/common';
import { FooterDataType } from './interface/footer.interface';

@Injectable()
export class FooterService {
  async getFooterData(lang: string): Promise<FooterDataType> {
    try {
      const footerDataKh: FooterDataType = {
        logo: '/images/CamCyber_Logo_white.png',
        description:
          'ផលិតផលនិងសេវាទំនើបឌីជីថលកម្ពុជា សម្រាប់កុំព្យូទ័រ ឧបករណ៍ និងអនាគត',
        contact: 'ទំនាក់ទំនង',
        email: 'info@camcyberdigital.com',
        phone: '+855 87 955 888',
        location: 'Phnom Penh',
        copyright: '2024 CamCyber Digital Tech Team',
        facebookLink: 'https://www.facebook.com/?_rdc=1&_rdr',
        telegramLink: '#',
        youtubeLink: '#',
      };
      const footerDataEn: FooterDataType = {
        logo: '/images/CamCyber_Logo_white.png',
        description:
          'Modern digital products and services in Cambodia for computers, devices, and the future.',
        contact: 'Contact',
        email: 'info@camcyberdigital.com',
        phone: '+855 87 955 888',
        location: 'Phnom Penh',
        copyright: '2024 CamCyber Digital Tech Team',
        facebookLink: 'https://www.facebook.com/?_rdc=1&_rdr',
        telegramLink: '#',
        youtubeLink: '#',
      };

      return lang === 'kh' ? footerDataKh : footerDataEn;
    } catch (error) {
      throw error;
    }
  }
}
