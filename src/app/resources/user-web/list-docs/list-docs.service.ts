import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Op } from 'sequelize';
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';
import { DocumentListWeb } from './interface/documentWeb.interface';

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
        attributes: ['id', 'title', 'created_at', 'file_uri', 'extension'],
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

  async getWebData(lang: string): Promise<DocumentListWeb> {
    const documentListWeb: DocumentListWeb = {
      homePage: lang === 'kh' ? 'ទំព័រដើម' : 'Home',
      currectPage: lang === 'kh' ? 'ស្វែងរក' : 'Search',
      SearchPaceholder: lang === 'kh' ? 'ស្វែងរកឯកសារ' : 'Search document',
      id: lang === 'kh' ? 'លេខសម្គាល់' : 'ID',
      title: lang === 'kh' ? 'ចំណងជើង' : 'Title',
      download: lang === 'kh' ? 'ទាញយក' : 'Downlaod',
      previous: lang === 'kh' ? 'មុន' : 'Previous',
      next: lang === 'kh' ? 'បន្ទាប់' : 'Next',
    };
    return documentListWeb;
  }

  async downloadFileFromExternalService(fileUrl: string) {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'arraybuffer',
      });
      return {
        data: response.data,
        contentType:
          response.headers['content-type'] || 'application/octet-stream',
      };
    } catch (error) {
      console.error('Error fetching file:', error);
      throw new Error('File fetch error');
    }
  }
}
