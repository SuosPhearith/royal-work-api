// =========================================================================>> Core Library
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FileService } from 'src/app/services/file.service';
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';
import Orgs from 'src/models/orgs/orgs.model';
// =========================================================================>> Third Party Library
// =========================================================================>> Custom Library
import { FileUploader } from 'src/app/shared/upload_file';
import FileDocs from 'src/models/file/file.model';
@Injectable()
export class DocsService {

    private fileBaseUrl = process.env.FILE_BASE_URL;
    private readonly allowedMimeTypes = {
        png: 'image/png',
        pdf: 'application/pdf',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

    constructor(private fileService: FileService){}

    async read(): Promise<any> {
        try {
            const docsList = await Docs.findAll({
                attributes: ['id', 'title', 'file_uri', 'extension', 'is_active', 'created_at', 'updated_at'],
                include: [
                    {
                        model: DocsType,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Orgs,
                        attributes: ['id', 'kh_name', 'en_name']
                    }
                ],
                order: [['id', 'ASC']]
            });
            // Map documents to extract file metadata
            const docsWithMetadata =  docsList.map(doc => ({
                ...doc.get(),
                file_uri: doc.file_uri,
                extension: doc.extension
            }));
        
            // Calculate file sizes
            const sizes = await this.calculateSizesForDocs(docsWithMetadata);
        
            // Attach sizes to documents
            const docs = docsWithMetadata.map((doc, index) => ({
                ...doc,
                file_size: `${(sizes[index].size / (1024 * 1024)).toFixed(2)} MB`,
                
            }));
  
            const docs_type = await DocsType.findAll({
                attributes: ['id', 'name'],
            });

            const orgs = await Orgs.findAll({
                attributes: ['id', 'kh_name'],
            });

            const data =  {docs, docs_type, orgs};

            return{
                data
                }
        } catch (error) {
            throw new Error();
        }

    }

     /* ========== ​create ========== */
     async create(body: any, file: Express.Multer.File, creatorId: number) {
        try {

            // set file upload is optional
            let fileUri = 'upload/file/956d3753-ba5d-4903-9750-50c6ad41c14f';
            let extension = 'pdf';

            // if have file upload it will take file upload
            if (file) {

                const fileUploader = new FileUploader(this.fileService);
                // upload the file and get the file details
                const uploadResult = await fileUploader.uploadFile(file);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                fileUri = uploadResult.fileUri;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                extension = uploadResult.extension;
            }
            const cmpExt = extension; 

            const findFileName = await FileDocs.findOne({
                attributes: ['id'],
                where :{
                    name: cmpExt,
                }
            })
            const file_id = findFileName.id;

            const docs = await Docs.create({
                creator_id: creatorId,
                docs_type_id: body.docs_type_id,
                orgs_id: body.orgs_id,
                file_id: file_id,
                title: body.title,
                is_active: body.is_active,
                file_uri: fileUri,
                extension: extension,
            });

           
            return {
                data: docs,
                status: 'success',
                message: 'បង្កើតឯកសារបានដោយជោគជ័យ',
            };
        } catch (error) {
            throw new Error();
        }
    }
    

    async getFileMetadata(url: string, extension: string): Promise<{ size: number, type: string }> {
        try {
            const mimeType = this.allowedMimeTypes[extension] || 'application/octet-stream';
            const response = await axios({
              url,
              method: 'HEAD',
            });
      
            const fileSize = parseInt(response.headers['content-length'] || '0', 10);
            const fileType = response.headers['content-type'] || mimeType;

            return { size: fileSize, type: fileType };
          } catch (error) {
            console.error(`Failed to fetch metadata for URL ${url}:`, error);
            throw new Error('Failed to fetch file metadata');
          }
    }

    async calculateSizesForDocs(docs: Array<{ file_uri: string, extension: string }>): Promise<Array<{ size: number, type: string }>> {
        return Promise.all(docs.map(doc => this.getFileMetadata(this.fileBaseUrl+'/'+doc.file_uri, doc.extension)));
      }
}

