import { Controller, Get, Query, Res } from '@nestjs/common';
import { ListDocsService } from './list-docs.service';
import { GetDcosDto } from './dto/get-docs.dto';
import { Response } from 'express';

@Controller('list-docs')
export class ListDocsController {
  constructor(private readonly listDocsService: ListDocsService) {}
  @Get()
  async getAllDocs(@Query() getDocsDto: GetDcosDto) {
    const { search, limit, page } = getDocsDto;
    return await this.listDocsService.getDocs(search, limit, page);
  }
  @Get('/web')
  async getWebData(@Query('lang') lang: string) {
    return await this.listDocsService.getWebData(lang);
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
}
