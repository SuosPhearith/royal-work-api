// =========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';
// =========================================================================>> Third Party Library
import { Sequelize, Op } from 'sequelize';
// =========================================================================>> Custom Library
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';
@Injectable()
export class DocsTypeService {

    async read(search?: string): Promise<any> {
        try {
            let searchCriteria = {};
            if(search){
                searchCriteria = {
                    [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    ],
                };
            }

            const docs_type = await DocsType.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Docs,
                        attributes: ['id']
                    }
                ],
                order: [['id', 'ASC']],
                where: searchCriteria
            });
            const result = docs_type.map(docstype => {
                const docstypeJson = docstype.toJSON();
                delete docstypeJson.docs; // Remove the Docs array

                return {
                    ...docstypeJson,
                    num_docs: docstype.docs.length, // Count the number of associated Docs
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
    
            const docs_type = await DocsType.create({
                name: body.name,
            });
    
            return {
               docs_type,
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
    
            const docs_type = await DocsType.findByPk(id);
            if (!docs_type) {
                throw new Error('Not found!');
            }

            const updateData: any = {
                name: body.name,
            };
            await docs_type.update(updateData);

            const res_docsType = await DocsType.findByPk(id);
    
            return {
                res_docsType,
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
            const docs_type = await DocsType.findByPk(id);

            if (!docs_type) {
                return {
                    status: 'error',
                    message: "Not found!"
                };
            }

            await DocsType.destroy({where: {id: id}});

            return {
                status: 'success',
                message: "លុបដោយជោគជ័យ"
            };

        } catch (err) {
            throw new BadRequestException("success: ", err.message);
        }
    }

  
}

