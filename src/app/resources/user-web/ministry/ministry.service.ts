import { Injectable, NotFoundException } from '@nestjs/common';
import { MinistryData } from './interface/ministry.interface';
import Language from 'src/models/language/language.model';
import MinistryTitle from 'src/models/ui_ministry/ministry_title.model';
import MinistryLogo from 'src/models/ui_ministry/ministry_logo.model';
import { UpdateMinistryTitleDto } from './dto/update-ministry-title.dto';
import { CreateMinistryLogoDto } from './dto/create-ministry-logo.dto';
import { FileService } from 'src/app/services/file.service';

@Injectable()
export class MinistryService {
  constructor(private fileService: FileService) {}
  async getMinistryData(lang: string = 'en'): Promise<MinistryData> {
    try {
      // const find id lang
      const langId = await Language.findOne({ where: { code: lang } });
      const response = await MinistryTitle.findOne({
        where: { language_id: langId.id },
      });
      const ministryLogoes = await MinistryLogo.findAll();
      // filter logoes
      const logoes = ministryLogoes.map((i) => ({
        id: i.dataValues.id,
        name: i.dataValues.name,
        image: i.dataValues.image,
      }));
      const ministryData: MinistryData = {
        title: response.title,
        logo: logoes,
      };
      return ministryData;
    } catch (error) {
      throw error;
    }
  }

  async getAllMinistryTitle(): Promise<MinistryTitle[]> {
    // get data from db
    const res = await MinistryTitle.findAll({ include: ['language'] });
    return res;
  }

  async updateMinistryTitle(
    id: number,
    updateMinistryTitleDto: UpdateMinistryTitleDto,
  ) {
    // is valid Id
    const ministryTitleId = await MinistryTitle.findByPk(id);
    if (!ministryTitleId) {
      throw new NotFoundException();
    }
    // Perform the update
    await MinistryTitle.update(updateMinistryTitleDto, {
      where: { id },
    });
    return 'Updated successfully';
  }

  // logo

  async getAllMinistryLogo(): Promise<MinistryLogo[]> {
    // get data from db
    const res = await MinistryLogo.findAll();
    return res;
  }

  async getOneMinistryLogo(id: number): Promise<MinistryLogo> {
    // is valid id
    const isMinistryLogo = await MinistryLogo.findByPk(id);
    if (!isMinistryLogo) {
      throw new NotFoundException();
    }
    return isMinistryLogo;
  }

  async createMinistryLogo(createMinistryLogoDto: CreateMinistryLogoDto) {
    const fileResult = await this.fileService.uploadBase64Image(
      'fileType',
      createMinistryLogoDto.image,
    );
    // Perform the create
    await MinistryLogo.create({
      ...createMinistryLogoDto,
      image: fileResult.file.uri,
    });
    return 'Created successfully';
  }

  async deleteMinistryLogo(id: number) {
    // is valid id
    const ministryLogo = await this.getOneMinistryLogo(id);
    // Perform the create
    await MinistryLogo.destroy({ where: { id: ministryLogo.id } });
    return 'Deleted successfully';
  }
}
