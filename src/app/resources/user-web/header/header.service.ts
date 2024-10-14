import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HeaderDataType } from './interface/header.interface';
import HeaderLink from 'src/models/orgs/header_link.model';
import Language from 'src/models/language/language.model';
import OrgsType from 'src/models/orgs/orgs_type.model';
import Orgs from 'src/models/orgs/orgs.model';
import { CreateHeaderDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { CreateOrgsTypeDto } from './dto/create-orgs-type.dto';
import { UpdateOrgsTypeDto } from './dto/update-orgs-type.dto';
import Logo from 'src/models/logo/logo.model';
import { FileService } from 'src/app/services/file.service';
import { UpdateLogoDto } from './dto/update-logo.dto';
import Docs from 'src/models/docs/docs.model';

@Injectable()
export class HeaderService {
  constructor(private fileService: FileService) {}
  transformResponse = (headerLinks, logo, logoWhite): HeaderDataType => {
    return {
      logo: logo,
      logoWhite: logoWhite,
      links: headerLinks.map((headerLink) => ({
        title: headerLink.title,
        items: headerLink.orgsType.map((orgType) => ({
          id: orgType.id,
          name: orgType.name,
          items: orgType.orgs.map((org) => ({
            id: org.id,
            name: org.kh_name,
            value: org.id * 10, // Example for value, you can replace with actual logic
          })),
        })),
      })),
    };
  };
  transformResponseV2 = (
    headerLinks,
    orgsType,
    kingMessages,
    logo,
    logoWhite,
  ): HeaderDataType => {
    return {
      logo: logo,
      logoWhite: logoWhite,
      links: [
        {
          title: headerLinks[0].title,
          items: orgsType.map((orgType) => ({
            id: orgType.id,
            name: orgType.name,
            items: orgType.orgs.map((org) => ({
              id: org.id,
              name: org.kh_name,
              value: org.docsCount, // Example for value, you can replace with actual logic
            })),
          })),
        },
        {
          title: headerLinks[1].title,
          items: [
            {
              id: 1,
              name: 'ប្រភេទគតិយុត្ត',
              items: orgsType.map((orgType) => ({
                id: orgType.id,
                name: orgType.name,
                value: orgType.orgsTypeValue, // Example for value, you can replace with actual logic
              })),
            },
            {
              id: 2,
              name: 'ឯកសាររាជកិច្ច',
              items: kingMessages.map((kingMessage) => ({
                id: kingMessage.year,
                name: kingMessage.year,
                value: kingMessage.value,
              })),
            },
          ],
        },
      ],
    };
  };

  async getHeader(lang: string = 'en'): Promise<HeaderDataType> {
    // find id lang
    const langId = await Language.findOne({ where: { code: lang } });
    // get header link base on lang
    const headerLinkData = await HeaderLink.findAll({
      where: { language_id: langId.id },
    });
    // get orgs type
    const orgsTypeData = await OrgsType.findAll({
      include: [
        {
          model: Orgs,
          include: [{ model: Docs, attributes: ['id'] }],
        },
      ],
    });

    // get king message
    const kingMessageDocs = await Docs.findAll({
      where: { docs_type_id: 7 },
      raw: true, // This option returns plain objects instead of Sequelize instances
    });

    const kingMessage = kingMessageDocs.reduce((acc, doc: any) => {
      const year = new Date(doc.created_at).getFullYear(); // Use 'created_at' if the field is snake_case
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    // Convert the result into the desired format
    const formattedResult = Object.entries(kingMessage).map(
      ([year, value]) => ({
        year: String(year), // Convert year to string
        value: value,
      }),
    );

    // Use JS to count docs for each org
    const orgsType = orgsTypeData.map((orgType) => {
      const orgsWithDocsCount = orgType.orgs.map((org) => {
        const docsCount = org.docs.length; // Count the number of docs for each org
        return {
          ...org.get(), // Spread the original org object
          docsCount, // Add docsCount to the result
        };
      });

      return {
        ...orgType.get(), // Spread the original orgType object
        orgs: orgsWithDocsCount, // Replace orgs with the modified data
        orgsTypeValue: orgType.orgs.length,
      };
    });
    // get logo
    const logo = await Logo.findAll();
    const logoData = logo.at(0);
    const transformedData = this.transformResponseV2(
      headerLinkData,
      orgsType,
      formattedResult,
      logoData.logo,
      logoData.logo_white,
    );
    return transformedData;
  }

  async getHeaderV2(lang: string = 'kh'): Promise<HeaderDataType> {
    // const find id lang
    const langId = await Language.findOne({ where: { code: lang } });
    const headerLink = await HeaderLink.findAll({
      where: { language_id: langId.id },
      include: [
        {
          model: OrgsType,
          include: [
            {
              model: Orgs,
            },
          ],
        },
      ],
    });
    // get logo
    const logo = await Logo.findAll();
    const logoData = logo.at(0);
    const transformedData = this.transformResponse(
      headerLink,
      logoData.logo,
      logoData.logo_white,
    );
    return transformedData;
  }

  // logo
  async getAllLogo() {
    const logo = await Logo.findAll();
    const logoData = logo.at(0);
    return logoData;
  }

  async updateLogo(UpdateLogoDto: UpdateLogoDto) {
    const logo = await Logo.findAll();
    const logoData = logo.at(0);
    const fileResult = await this.fileService.uploadBase64Image(
      'fileType',
      UpdateLogoDto.logo,
    );
    // Perform the update
    await Logo.update(
      { logo: fileResult.file.uri },
      { where: { id: logoData.id } },
    );
    return 'Upated Successfully';
  }

  async updateLogoWhite(UpdateLogoDto: UpdateLogoDto) {
    const logo = await Logo.findAll();
    const logoData = logo.at(0);
    const fileResult = await this.fileService.uploadBase64Image(
      'fileType',
      UpdateLogoDto.logo,
    );
    // Perform the update
    await Logo.update(
      { logo_white: fileResult.file.uri },
      { where: { id: logoData.id } },
    );
    return 'Upated Successfully';
  }

  // header link

  async getOneHeaderLink(id: number) {
    const headerLink = await HeaderLink.findByPk(id);
    if (!headerLink) {
      throw new NotFoundException();
    }
    return headerLink;
  }

  async getAllHeaderLink() {
    const headerLinks = await HeaderLink.findAll({ include: ['language'] });
    return headerLinks;
  }

  async createHeaderLink(createHeaderDto: CreateHeaderDto) {
    // const find id lang
    const langId = await Language.findOne({
      where: { code: createHeaderDto.language },
    });
    if (!langId) {
      throw new BadRequestException();
    }
    // Perform the create
    await HeaderLink.create({
      title: createHeaderDto.title,
      language_id: langId.id,
    });
    return 'Created successfully';
  }

  async updateHeaderLink(id: number, updateHeaderDto: UpdateHeaderDto) {
    // is headerLink Id
    const headerLink = await HeaderLink.findByPk(id);
    if (!headerLink) {
      throw new NotFoundException();
    }
    // Perform the update
    await HeaderLink.update(updateHeaderDto, { where: { id: headerLink.id } });
    return 'Updated successfully';
  }

  async deleteHeaderLink(id: number) {
    // is headerLink Id
    const headerLink = await HeaderLink.findByPk(id);
    if (!headerLink) {
      throw new NotFoundException();
    }
    // Perform the delete
    await HeaderLink.destroy({ where: { id: headerLink.id } });
    return 'Deleted successfully';
  }

  // orgs type

  async getOneOrgsType(id: number) {
    // is valid Id
    const orgsType = await OrgsType.findByPk(id);
    if (!orgsType) {
      throw new NotFoundException();
    }
    return orgsType;
  }

  async getByHeaderLink(headerLinkId: number) {
    // is valid headerLinkId
    const headerLink = await HeaderLink.findByPk(headerLinkId);
    if (!headerLink) {
      throw new NotFoundException();
    }
    const orgsTypes = await OrgsType.findAll({
      where: { header_link_id: headerLink.id },
    });
    return orgsTypes;
  }

  async createOrgsType(createOrgsTypeDto: CreateOrgsTypeDto) {
    // is header link
    const headerLink = await HeaderLink.findByPk(
      createOrgsTypeDto.headerLinkId,
    );
    if (!headerLink) {
      throw new NotFoundException();
    }
    // Perfrom
    await OrgsType.create({
      name: createOrgsTypeDto.name,
      header_link_id: headerLink.id,
    });
    return 'Created successfully';
  }

  async updateOrgsType(id: number, updateOrgsTypeDto: UpdateOrgsTypeDto) {
    // is valid id
    const orgsType = await this.getOneOrgsType(id);
    // Perform the update
    await OrgsType.update(
      { name: updateOrgsTypeDto.name },
      { where: { id: orgsType.id } },
    );
    return 'Updated successfully';
  }

  async deleteOrgsType(id: number) {
    // is valid Id
    const orgsType = await this.getOneOrgsType(id);
    // Perform the delete
    await OrgsType.destroy({ where: { id: orgsType.id } });
    return 'Deleted successfully';
  }

  // orgs
}
