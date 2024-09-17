import { Controller, Get, Query } from '@nestjs/common';
import { SearchAreaService } from './search-area.service';
import { AutoCompleteSearchDto } from './dto/auto-complete.dto';

@Controller('search-area')
export class SearchAreaController {
  constructor(private readonly searchAreaService: SearchAreaService) {}
  @Get()
  async getSearchArea(@Query('lang') lang: string) {
    return this.searchAreaService.getSearchArea(lang);
  }

  @Get('auto-complete')
  async getAutoCompleteSearch(@Query() query: AutoCompleteSearchDto) {
    const { search, limit } = query;
    return this.searchAreaService.getAutoCompleteSearch(search, +limit || 10);
  }
}
