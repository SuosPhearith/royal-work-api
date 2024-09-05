// =========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import Docs from 'src/models/docs/docs.model';
import FileDocs from 'src/models/file/file.model';
// =========================================================================>> Third Party Library
// =========================================================================>> Custom Library
import { FileService } from 'src/app/services/file.service';
@Injectable()
export class FileTypeService {

    constructor(private fileService: FileService){}
    async read(): Promise<any> {
        try {
            const data = await FileDocs.findAll({
                attributes: ['id', 'name', 'image_uri'],
                include: [
                    {
                        model: Docs,
                        attributes: ['id']
                    }
                ],
                order: [['id', 'ASC']],
            });
            const result = data.map(fileDoc => {
                const fileDocJson = fileDoc.toJSON();
                delete fileDocJson.docs; // Remove the Docs array

                return {
                    ...fileDocJson,
                    num_docs: fileDoc.docs.length, // Count the number of associated Docs
                };
              });
  
            return{
                data: result
            }
        } catch (error) {
            throw new Error();
        }
    }

    //===========================================>> Create 
    async create(body: any): Promise<any> {
        try {

            if (body.image_uri) {

                const result = await this.fileService.uploadBase64Image('fileType', body.image_uri);
                
                if (result.error) {
                    throw new Error();
                }
                body.image_uri = result.file.uri;
            }
    
            const file = await FileDocs.create({
                name: body.name,
                image_uri: body.image_uri
            });

    
            return {
               file,
               status: 'success',
               message: "បង្គើតដោយជោគជ័យ"
            };

        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    //===========================================>> Update
    async update(id: number, body: any): Promise<any> {
        try {
    
            const file = await FileDocs.findByPk(id);
            if (!file) {
                throw new Error('Not found!');
            }

            if (body.image_uri) {

                const result = await this.fileService.uploadBase64Image('fileType', body.image_uri);
                
                if (result.error) {
                    throw new BadRequestException(result.error);
                }
                body.image_uri = result.file.uri;
                
            }

            const updateData: any = {
                name: body.name,
            };
            // Include image_uri only if it's not null
            if (body.image_uri) {
                updateData.image_uri = body.image_uri;
            }
    
            await file.update(updateData);

            const res_file = await FileDocs.findByPk(id);
    
            return {
                res_file,
                status: 'success',
                message: "កែប្រដោយជោគជ័យ"
            }

        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    //===========================================>> Delete 
    async delete(id: number) {
        try {
            const file = await FileDocs.findByPk(id);

            if (!file) {
                return {
                    status: 'error',
                    message: "Not found!"
                };
            }

            await FileDocs.destroy({where: {id: id}});

            return {
                status: 'success',
                message: "លុបដោយជោគជ័យ"
            };

        } catch (err) {
            throw new BadRequestException("success: ", err.message);
        }
    }
  
}

