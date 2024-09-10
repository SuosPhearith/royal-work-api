import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';

@Injectable()
export class ListDocsService {
  async getDocs(search: string, limit: number, page: number) {
    try {
      const offset = (page - 1) * limit; // Calculate the offset

      // Query the docs with search, pagination, and include related models
      const { rows: docs, count: totalDocs } = await Docs.findAndCountAll({
        where: {
          title: {
            [Op.regexp]: search.split('').join('.*'),
          },
          is_active: true,
        },
        limit, // Limit the number of results
        offset, // Offset for pagination
        order: [['created_at', 'DESC']], // Optional: order by creation date
        attributes: ['id', 'title', 'created_at', 'file_uri'],
        include: [
          { model: DocsType, attributes: ['id', 'name'] }, // Include DocsType association
        ],
      });

      // Calculate total pages
      const totalPages = Math.ceil(totalDocs / limit);

      // Return the results along with pagination info
      return {
        data: docs,
        pagination: {
          totalDocs,
          totalPages,
          currentPage: page,
        },
      };
    } catch (error) {
      throw new Error(`Error fetching docs: ${error.message}`);
    }
  }
}
