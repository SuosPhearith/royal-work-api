import { Injectable, NotFoundException } from '@nestjs/common';
import FooterInfo from 'src/models/ui_text/footer_info.model';
import Language from 'src/models/language/language.model';
import { CreateFooterInfoDto } from './dto/create-footer-info.dto';
import { FooterDataType } from './interface/footer.interface';
import { FileService } from 'src/app/services/file.service';

@Injectable()
export class FooterService {
  constructor(private fileService: FileService) {}
  async getFooterData(lang: string = 'kh'): Promise<FooterDataType> {
    try {
      // const find id lang
      const langId = await Language.findOne({ where: { code: lang } });
      const response = await FooterInfo.findOne({
        where: { language_id: langId.id },
      });
      // filter
      const dataRes: FooterDataType = {
        logo: response.logo,
        description: response.description,
        contact: response.contact,
        email: response.email,
        phone: response.phone,
        location: response.location,
        copyright: response.copyright,
        facebookLink: response.facebook_link,
        telegramLink: response.telegram_link,
        youtubeLink: response.youtube_link,
      };
      return dataRes;
    } catch (error) {
      throw error;
    }
  }

  async getAllFooterData(): Promise<FooterInfo[]> {
    // get data from db
    const footerData = await FooterInfo.findAll({ include: ['language'] });
    return footerData;
  }

  async updateFooter(id: number, createFooterInfoDto: CreateFooterInfoDto) {
    // Check if the ID exists in the database
    const footerInfo = await FooterInfo.findByPk(id);
    if (!footerInfo) {
      throw new NotFoundException(`Footer with ID ${id} not found`);
    }
    if (createFooterInfoDto.logo) {
      const fileResult = await this.fileService.uploadBase64Image(
        'fileType',
        createFooterInfoDto.logo,
      );
      // Perform the update
      await FooterInfo.update(
        { ...createFooterInfoDto, logo: fileResult.file.uri },
        {
          where: { id },
        },
      );
      // Fetch and return the updated record
      const updatedFooterInfo = await FooterInfo.findByPk(id);

      return updatedFooterInfo;
    }

    // Perform the update
    await FooterInfo.update(createFooterInfoDto, {
      where: { id },
    });

    // Fetch and return the updated record
    const updatedFooterInfo = await FooterInfo.findByPk(id);

    return updatedFooterInfo;
  }
}
