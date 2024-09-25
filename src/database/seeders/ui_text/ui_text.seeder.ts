import ListDocsText from "../../../models/ui_text/list_docs_text.model";
import FooterInfo from "../../../models/ui_text/footer_info.model";
import SearchText from "../../../models/ui_text/search_text.model";
import SearchMiddleText from "../../../models/ui_text/search_middle_text.model";

export class UITextSeeder {
    seed = async () => {
      await FooterInfo.bulkCreate(data.footer_info);
      console.log(
        '\u001b[1;32m =                     UI_FooterInfo has been seeded. ',
      );

      await ListDocsText.bulkCreate(data.list_docs_text);
      console.log(
        '\u001b[1;32m =                     UI_ListDocsText has been seeded. ',
      );

      await SearchText.bulkCreate(data.search_text);
      console.log(
        '\u001b[1;32m =                     UI_SearchText has been seeded. ',
      );

      await SearchMiddleText.bulkCreate(data.search_middle_text);
      console.log(
        '\u001b[1;32m =                     UI_SearchMiddleText has been seeded. ',
      );
    };

    };

  
  // Mock-data
  const data = {
  
    footer_info: [
      {   
        language_id: 1,
        logo: '/images/CamCyber_Logo_white.png',
        description: 'ផលិតផលនិងសេវាទំនើបឌីជីថលកម្ពុជា សម្រាប់កុំព្យូទ័រ ឧបករណ៍ និងអនាគត',
        contact: 'ទំនាក់ទំនង',
        email: 'info@camcyberdigital.com',
        phone: '+855 87 955 888',
        location: 'Phnom Penh',
        copyright: '2024 CamCyber Digital Tech Team',
        facebook_link: 'https://www.facebook.com/?_rdc=1&_rdr',
        telegram_link: '#',
        youtube_link: '#'
      },
    ],

    list_docs_text: [
        {   
          language_id: 1,
          home_page: 'ទំព័រដើម',
          current_page: 'ស្វែងរក',
          search_placeholder: 'ស្វែងរកឯកសារ',
          docs_id_label: 'លេខសម្គាល់',
          title_label: 'ចំណងជើង',
          download_label: 'ទាញយក',
          previous_label: 'មុន',
          next_label: 'បន្ទាប់',
        },
    ],

    search_text: [
      {   
        language_id: 1,
        start_text: 'ស្វែងរកឯកសារ',
        end_text: 'នៃព្រះរាជាណាចក្រកម្ពុជាតាំងពីឆ្នាំ ១៩៩៣',
        search_text: 'ស្វែងរកឯកសារ',
      }
    ],

    search_middle_text: [
      {   
        language_id: 1,
        texts_id: 1,
        text: 'ច្បាប់',
      },
      {   
        language_id: 1,
        texts_id: 1,
        text: 'រាជក្រឹត',
      },
      {   
        language_id: 1,
        texts_id: 1,
        text: 'អនុក្រឹត',
      },
      {   
        language_id: 1,
        texts_id: 1,
        text: 'ផ្លូវការ',
      }
    ],
}