// =========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { FileService } from 'src/app/services/file.service';
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';
import Orgs from 'src/models/orgs/orgs.model';
// =========================================================================>> Third Party Library
import { Op } from "sequelize";
// =========================================================================>> Custom Library
import { FileUploader } from 'src/app/shared/upload_file';
import FileDocs from 'src/models/file/file.model';
import DocsEditor from 'src/models/docs/docs_editor.model';
import DocsDeletion from 'src/models/docs/docs_deletion.model';
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

    async read(search?: string): Promise<any> {
        try {
            // Deleted expired docs in bin
            this.deleteExpiredDocuments();

            let searchCriteria = {};
            if(search){
                searchCriteria = {
                    [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { extension: { [Op.iLike]: `%${search}%` } },
                    ],
                };
            }

            //Start doing its core task
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
                order: [['id', 'ASC']],
                where: searchCriteria
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
     async create(body: any, file: Express.Multer.File, creatorId: number) : Promise<any> {
        try {
            let fileUri: string;
            let extension: string;

            // if have file upload it will take file upload
            if (file) {

                const fileUploader = new FileUploader(this.fileService);
                // upload the file and get the file details
                const uploadResult = await fileUploader.uploadFile(file);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                fileUri = uploadResult.fileUri;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                extension = uploadResult.extension.slice(1);

            } else{
                throw new BadRequestException("File is required!")
            }

            const findFileName = await FileDocs.findOne({
                attributes: ['id'],
                where :{
                    name: extension,
                }
            });

            if(!findFileName){
                throw new BadRequestException("Invalid File Extension!");
            }

            const file_id = findFileName.id;


            const docs = await Docs.create({
                creator_id: creatorId,
                docs_type_id: body.docs_type_id,
                orgs_id: body.orgs_id,
                file_id: file_id,
                title: body.title,
                is_active: Boolean(body.is_active),
                file_uri: fileUri,
                extension: extension,
            });

           
            return {
                status: 'success',
                message: 'បង្កើតឯកសារបានដោយជោគជ័យ',
                data: docs,

            };
        } catch (error) {
            throw new Error();
        }
    }

    /* ========== ​update ========== */
    async update(id: number, body: any, file: Express.Multer.File, updaterId: number): Promise<any>  {
        try {

            const docs = await Docs.findByPk(id);

            if (!docs) {
                throw new BadRequestException('Docs Not Found!');
            }

            let fileUri = docs.file_uri;
            let extension = docs.extension;
            
            // if have file upload it will take file upload
            if (file) {

                const fileUploader = new FileUploader(this.fileService);
                // upload the file and get the file details
                const uploadResult = await fileUploader.uploadFile(file);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                fileUri = uploadResult.fileUri;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                extension = uploadResult.extension.slice(1);

            }

            const findFileName = await FileDocs.findOne({
                attributes: ['id'],
                where :{
                    name: extension,
                }
            });

            if(!findFileName){
                throw new BadRequestException("Invalid File Extension!");
            }

            const file_id = findFileName.id;

            await docs.update({
                title: body.title,
                orgs_id: body.orgs_id,
                docs_type_id: body.docs_type_id,
                file_id: file_id,
                is_active: Boolean(body.is_active),
                file_uri: fileUri,
                extension: extension,

            });

            await DocsEditor.create({
                docs_id: id,
                editor_id: updaterId
            })

            const res_docs = await Docs.findByPk(id);
           
            return {
                status: 'success',
                message: 'បង្កើតឯកសារបានដោយជោគជ័យ',
                data: res_docs,

            };
        } catch (error) {
            throw new Error();
        }
    }

    //===========================================>> Delete 
    async delete(id: number, deleter_id: number) : Promise<any> {
        try {
            const docs = await Docs.findByPk(id);

            if (!docs) {
                return {
                    status: 'error',
                    message: "Docs Not found!"
                };
            }

            // Set expiry date 1 week from now
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);
            // return expiryDate;
            // Move deleted docs to bin
            const bin_docs = await DocsDeletion.create({
                deleter_id: deleter_id,
                creator_id: docs?.creator_id,
                docs_type_id: docs?.docs_type_id,
                orgs_id: docs?.orgs_id,
                title: docs?.title,
                file_id: docs?.file_id,
                file_uri: docs?.file_uri,
                extension: docs?.extension,
                expiry_date: new Date(expiryDate),
            });

            

            await Docs.destroy({where: {id: id}});

            return {
                status: 'success',
                message: "លុបដោយជោគជ័យ",
                bin_docs,
            };

        } catch (err) {
            throw new BadRequestException("success: ", err.message);
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

    // Function to delete the document after 1 week
    async deleteExpiredDocuments() {
        const now = new Date();
        
        // Find and delete all expired documents
        const expiredDocs = await DocsDeletion.findAll({
        where: {
            expiry_date: {
            [Op.lt]: now, // Documents with expiry_date less than the current date
            },
        },
        });

        for (const doc of expiredDocs) {
        await doc.destroy();
        }
    }
}

