import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { Op } from 'sequelize';
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';
import { DocumentListWeb } from './interface/documentWeb.interface';
import Language from 'src/models/language/language.model';
import ListDocsText from 'src/models/ui_text/list_docs_text.model';
import { UpdateListDocsTextDto } from './dto/list-docs.dto';
import Orgs from 'src/models/orgs/orgs.model';
import OrgsType from 'src/models/orgs/orgs_type.model';

@Injectable()
export class ListDocsService {
  // async getDocs(
  //   search: string,
  //   orgsId: string,
  //   orgs_typeId: string,
  //   limit: number,
  //   page: number,
  // ) {
  //   try {
  //     const offset = (page - 1) * limit; // Calculate the offset

  //     // Query the docs with search, pagination, and include related models
  //     const { rows: docs, count: totalDocs } = await Docs.findAndCountAll({
  //       where: {
  //         title: {
  //           [Op.regexp]: search.split('').join('.*'),
  //         },
  //         is_active: true,
  //       },
  //       limit, // Limit the number of results
  //       offset, // Offset for pagination
  //       order: [['created_at', 'DESC']], // Optional: order by creation date
  //       attributes: ['id', 'title', 'created_at', 'file_uri', 'extension'],
  //       include: [
  //         { model: DocsType, attributes: ['id', 'name'] }, // Include DocsType association
  //       ],
  //     });

  //     // Calculate total pages
  //     const totalPages = Math.ceil(totalDocs / limit);

  //     // Return the results along with pagination info
  //     return {
  //       data: docs,
  //       pagination: {
  //         totalDocs,
  //         totalPages,
  //         currentPage: page,
  //       },
  //     };
  //   } catch (error) {
  //     throw new Error(`Error fetching docs: ${error.message}`);
  //   }
  // }

  async getDocs(
    search: string,
    orgsId: string | null,
    orgs_typeId: string | null,
    limit: number,
    page: number,
  ) {
    try {
      const offset = (page - 1) * limit; // Calculate the offset

      // Build the dynamic where clause based on provided filters
      const whereClause: any = {
        title: {
          [Op.regexp]: search.split('').join('.*'),
        },
        is_active: true,
      };

      // Conditionally add filters if provided
      if (orgsId) whereClause.orgs_id = orgsId;
      if (orgs_typeId) whereClause['$orgs.orgs_type_id$'] = orgs_typeId;

      // Query the docs with search, pagination, and include related models
      const { rows: docs, count: totalDocs } = await Docs.findAndCountAll({
        where: whereClause,
        limit, // Limit the number of results
        offset, // Offset for pagination
        order: [['created_at', 'DESC']], // Optional: order by creation date
        attributes: ['id', 'title', 'created_at', 'file_uri', 'extension'],
        include: [
          { model: DocsType, attributes: ['id', 'name'] }, // Include DocsType association
          { model: Orgs, attributes: ['id', 'kh_name', 'orgs_type_id'] }, // Include Orgs for filtering
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

  async getWebData(lang: string = 'kh'): Promise<DocumentListWeb> {
    // const find id lang
    const langId = await Language.findOne({ where: { code: lang } });
    const response = await ListDocsText.findOne({
      where: { language_id: langId.id },
    });
    // filter response
    const dataRes: DocumentListWeb = {
      homePage: response.home_page,
      currectPage: response.current_page,
      SearchPaceholder: response.search_placeholder,
      id: response.docs_id_label,
      title: response.title_label,
      download: response.download_label,
      previous: response.previous_label,
      next: response.next_label,
    };
    return dataRes;
  }

  async getAllListDoc(): Promise<ListDocsText[]> {
    // get data from db
    const listDocData = await ListDocsText.findAll({ include: ['language'] });
    return listDocData;
  }

  async updateListDoc(
    id: number,
    updateListDocsTextDto: UpdateListDocsTextDto,
  ) {
    // is valid id
    const listDocId = await ListDocsText.findByPk(id);
    if (!listDocId) {
      throw new NotFoundException();
    }

    // perform the update
    await ListDocsText.update(updateListDocsTextDto, { where: { id } });

    // Fetch and return the updated record
    const updatedInfo = await ListDocsText.findByPk(id);
    return updatedInfo;
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

  // org
  async getAllOrgs() {
    const orgs = await Orgs.findAll();

    // Transform the data to the desired format
    return orgs.map((org) => ({
      value: org.id.toString(),
      label: org.kh_name,
    }));
  }

  // org-type
  async getAllOrgsType() {
    const orgsType = await OrgsType.findAll();

    // Transform the data to the desired format
    return orgsType.map((orgType) => ({
      value: orgType.id.toString(),
      label: orgType.name,
    }));
  }
}
