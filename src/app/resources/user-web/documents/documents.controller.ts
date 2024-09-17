import { Controller, Get, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get()
  async getDocuments(@Query('lang') lang: string) {
    return this.documentsService.getDocuments(lang);
  }
}
