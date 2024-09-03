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
        name: 'doc',
        image_uri: 'upload/file/9e763a12-4ad5-4fe9-8b97-372d23fef9bc',
      },
      {
        name: 'pdf',
        image_uri: 'upload/file/92f3a1cf-e3c1-4e63-8334-e5f387cf2ed4',
      },
      {
        name: 'xlsx',
        image_uri: 'upload/file/f7dca7ad-c03f-4bbf-a636-3e69dd767dee',
      },
      {
        name: 'png',
        image_uri: 'upload/file/d2a093ee-69a7-4561-b7fb-0c8a03fc7747',
      },
      {
        name: 'jpg',
        image_uri: 'upload/file/2aa51ee0-66b0-4fe5-91f6-9c8254f7c531',
      },
     
    ],
}