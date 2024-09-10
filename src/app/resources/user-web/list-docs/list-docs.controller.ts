import { Controller, Get, Query } from '@nestjs/common';
import { ListDocsService } from './list-docs.service';
import { GetDcosDto } from './dto/get-docs.dto';

@Controller('list-docs')
export class ListDocsController {
  constructor(private readonly listDocsService: ListDocsService) {}
  @Get()
  async getAllDocs(@Query() getDocsDto: GetDcosDto) {
    const { search, limit, page } = getDocsDto;
    return await this.listDocsService.getDocs(search, limit, page);
  }
}
