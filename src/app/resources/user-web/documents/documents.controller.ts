import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocsListDto } from './dto/update-docs-list.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get()
  async getDocuments(@Query('lang') lang: string) {
    return this.documentsService.getDocuments(lang);
  }

  @Patch(':id')
  async updateDocsListUi(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocsListDto: UpdateDocsListDto,
  ) {
    return this.documentsService.updateDocsListUi(id, updateDocsListDto);
  }
}
