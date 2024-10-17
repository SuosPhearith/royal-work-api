import { BadRequestException, Injectable } from '@nestjs/common';
import { EachDocumentKeyDataType } from './interface/documents.interface';
import Docs from 'src/models/docs/docs.model';
import DocsType from 'src/models/docs/docs_type.model';
import Orgs from 'src/models/orgs/orgs.model';
import DocsListUi from 'src/models/docs/docs_list_ui.model';
import Language from 'src/models/language/language.model';
import { UpdateDocsListDto } from './dto/update-docs-list.dto';

@Injectable()
export class DocumentsService {
  async getDocuments(lang: string = 'kh'): Promise<any> {
    // const find id lang
    const langId = await Language.findOne({ where: { code: lang } });
    const getNewDocs = await Docs.findAll({
      limit: 10,
      where: { is_active: true },
      order: [['created_at', 'DESC']],
      include: [
        { model: DocsType, attributes: ['id', 'name'] },
        { model: Orgs, attributes: ['kh_name', 'en_name', 'image_uri'] },
      ],
    });
    // get list docs
    const docsListUi = await DocsListUi.findOne({
      where: { language_id: langId.id },
    });
    const newDocsData: EachDocumentKeyDataType = {
      title: docsListUi.new_text,
      seeAll: docsListUi.all_text,
      docKeys: getNewDocs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        file_uri: doc.file_uri,
        image_uri: doc.image_uri,
        extension: doc.extension,
        created_at: doc.created_at,
        markbook: false,
        org: {
          image_uri: doc.orgs.image_uri,
          name: lang === 'kh' ? doc.orgs.kh_name : doc.orgs.en_name,
        },
        docs_type: {
          id: doc.docs_type.id,
          name: doc.docs_type.name,
        },
      })),
    };
    const mianDocsData: EachDocumentKeyDataType = {
      title: docsListUi.important_text,
      seeAll: docsListUi.all_text,
      docKeys: getNewDocs.map((doc: any) => ({
        id: doc.id,
        title: doc.docs_type.name,
        file_uri: doc.file_uri,
        image_uri: doc.image_uri,
        extension: doc.extension,
        created_at: doc.created_at,
        markbook: false,
        org: {
          image_uri: doc.orgs.image_uri,
          name: lang === 'kh' ? doc.orgs.kh_name : doc.orgs.en_name,
        },
        docs_type: {
          id: doc.docs_type.id,
          name: doc.docs_type.name,
        },
      })),
    };

    return [newDocsData, mianDocsData];
  }

  async updateDocsListUi(id: number, updateDocsListDto: UpdateDocsListDto) {
    // is valid id
    const isDocsList = await DocsListUi.findByPk(id);
    if (!isDocsList) {
      throw new BadRequestException();
    }
    // Perform the update
    await DocsListUi.update(updateDocsListDto, {
      where: { id: isDocsList.id },
    });
    return 'Updated successfully';
  }
}
