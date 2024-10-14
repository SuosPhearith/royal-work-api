import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchAreaService } from './search-area.service';
import { AutoCompleteSearchDto } from './dto/auto-complete.dto';
import { UpdateSearchTextDto } from './dto/update-search-text.dto';
import { CreateSearchMiddleTextDto } from './dto/CreateSearchMiddleTextDto';
import { UpdateSearchMiddleTextDto } from './dto/UpdateSearchMiddleTextDto';

@Controller('search-area')
export class SearchAreaController {
  constructor(private readonly searchAreaService: SearchAreaService) {}
  @Get()
  async getSearchArea(@Query('lang') lang: string) {
    return this.searchAreaService.getSearchArea(lang);
  }

  @Patch(':id')
  async updateFooter(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSearchTextDto: UpdateSearchTextDto,
  ) {
    return this.searchAreaService.updateSearchText(id, updateSearchTextDto);
  }

  @Get('all')
  async getAllSearchText() {
    return this.searchAreaService.getAllSearchText();
  }

  @Get('auto-complete')
  async getAutoCompleteSearch(@Query() query: AutoCompleteSearchDto) {
    const { search, limit } = query;
    return this.searchAreaService.getAutoCompleteSearch(search, +limit || 10);
  }

  // middle text
  @Post('middle-text')
  async createMiddleText(
    @Body() createSearchMiddleTextDto: CreateSearchMiddleTextDto,
  ) {
    return this.searchAreaService.createMiddleText(createSearchMiddleTextDto);
  }

  @Get('middle-text/:id')
  async getBySearchTextId(@Param('id', ParseIntPipe) id: number) {
    return this.searchAreaService.getBySearchTextId(id);
  }

  @Patch('middle-text/:id')
  async updateMiddleText(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSearchMiddleTextDto: UpdateSearchMiddleTextDto,
  ) {
    return this.searchAreaService.updateMiddleText(
      id,
      updateSearchMiddleTextDto,
    );
  }

  @Delete('middle-text/:id')
  async deleteMiddleText(@Param('id', ParseIntPipe) id: number) {
    return this.searchAreaService.deleteMiddleText(id);
  }
}
