// =========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';
import Docs from 'src/models/docs/docs.model';
import Orgs from 'src/models/orgs/orgs.model';
// =========================================================================>> Third Party Library
// =========================================================================>> Custom Library
import { FileService } from 'src/app/services/file.service';

@Injectable()
export class OrgsService {
    constructor(private fileService: FileService){}

    async read(): Promise<any> {
        try {
            const docs_type = await Orgs.findAll({
                attributes: ['id', 'kh_name', 'en_name', 'image_uri', 'created_at'],
                include: [
                    {
                        model: Docs,
                        attributes: ['id']
                    }
                ],
                order: [['id', 'ASC']]
            });
            const result = docs_type.map(orgs => {
                const orgsJson = orgs.toJSON();
                delete orgsJson.docs; // Remove the Docs array

                return {
                    ...orgsJson,
                    num_docs: orgs.docs.length, // Count the number of associated Docs
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

                const result = await this.fileService.uploadBase64Image('organization', body.image_uri);
                
                if (result.error) {
                    throw new Error();
                }
                body.image_uri = result.file.uri;
            }

            const file = await Orgs.create({
                kh_name: body.kh_name,
                en_name: body.en_name,
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

            const orgs = await Orgs.findByPk(id);
            if (!orgs) {
                throw new Error('Not found!');
            }

            if (body.image_uri) {

                const result = await this.fileService.uploadBase64Image('organization', body.image_uri);
                
                if (result.error) {
                    throw new BadRequestException(result.error);
                }
                body.image_uri = result.file.uri;
                
            }

            const updateData: any = {
                kh_name: body.kh_name,
                en_name: body.en_name,
            };
            // Include image_uri only if it's not null
            if (body.image_uri) {
                updateData.image_uri = body.image_uri;
            }

            await orgs.update(updateData);

            const res_orgs = await Orgs.findByPk(id);

            return {
                res_orgs,
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
            const orgs = await Orgs.findByPk(id);

            if (!orgs) {
                return {
                    status: 'error',
                    message: "Not found!"
                };
            }

            await Orgs.destroy({where: {id: id}});

            return {
                status: 'success',
                message: "លុបដោយជោគជ័យ"
            };

        } catch (err) {
            throw new BadRequestException("success: ", err.message);
        }
    }

  
}

