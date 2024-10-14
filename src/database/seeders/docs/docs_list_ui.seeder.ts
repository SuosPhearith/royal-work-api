import DocsListUi from '../../../models/docs/docs_list_ui.model';

export class DocsListUiSeeder {
  seed = async () => {
    await DocsListUi.bulkCreate(data.docs);

    console.log('\u001b[1;32m =                     Docs has been seeded. ');
  };
}

// Mock-data
const data = {
  docs: [
    {
      language_id: 1,
      new_text: 'ឯកសារថ្មីៗ',
      important_text: 'ឯកសារសំខាន់ៗ',
      all_text: 'ទាំងអស់',
    },
    {
      language_id: 2,
      new_text: 'Recent Documents',
      important_text: 'Important documents',
      all_text: 'See all',
    },
  ],
};
