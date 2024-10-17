import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { ListDocsService } from './list-docs.service';
import { GetDcosDto } from './dto/get-docs.dto';
import { Response } from 'express';
import { UpdateListDocsTextDto } from './dto/list-docs.dto';

@Controller('list-docs')
export class ListDocsController {
  constructor(private readonly listDocsService: ListDocsService) {}
  @Get()
  async getAllDocs(@Query() getDocsDto: GetDcosDto) {
    const { search, orgs, orgs_type, limit, page } = getDocsDto;
    return await this.listDocsService.getDocs(
      search,
      orgs,
      orgs_type,
      limit,
      page,
    );
  }
  @Get('/web')
  async getWebData(@Query('lang') lang: string) {
    return await this.listDocsService.getWebData(lang);
  }

  @Get('/all')
  async getAllDoc() {
    return await this.listDocsService.getAllListDoc();
  }

  @Patch(':id')
  async updateListDoc(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListDocsTextDto: UpdateListDocsTextDto,
  ) {
    return await this.listDocsService.updateListDoc(id, updateListDocsTextDto);
  }

  @Get('download')
  async downloadFile(@Query('fileUrl') fileUrl: string, @Res() res: Response) {
    try {
      const { data, contentType } =
        await this.listDocsService.downloadFileFromExternalService(fileUrl);

      // Force the file to download
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', 'attachment; filename="file.pdf"');

      // Send file to the user
      res.send(data);
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('Error downloading the file');
    }
  }

  // org
  @Get('orgs')
  async getAllOrgs() {
    return await this.listDocsService.getAllOrgs();
  }
  @Get('orgs-type')
  async getAllOrgsType() {
    return await this.listDocsService.getAllOrgsType();
  }
}
