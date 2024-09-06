import FileDocs from "../../../models/file/file.model";

export class FileSeeder {
    seed = async () => {
      await FileDocs.bulkCreate(data.file);
  
      console.log(
        '\u001b[1;32m =                     File has been seeded. ',
      );
    };
  }
  
  // Mock-data
  const data = {
  
    file: [
      {   
        name: 'docx',
        image_uri: 'upload/file/28cd810e-fb35-4031-a04a-8b8afcda80b5',
      },
      {
        name: 'pdf',
        image_uri: 'upload/file/98f400ff-981d-40bb-a22c-ed216ce87db6',
      },
      {
        name: 'xlsx',
        image_uri: 'upload/file/cc7123a0-ccab-45b2-afce-9cde8c8b38db',
      },
      {
        name: 'png',
        image_uri: 'upload/file/1606204c-cb3d-402e-87e4-cf5a9ce0a310',
      },
      {
        name: 'jpg',
        image_uri: 'upload/file/43e55065-56a3-43ed-ab6c-18d1172b4a08',
      },
     
    ],
}