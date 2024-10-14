import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { FooterService } from './footer.service';
import { CreateFooterInfoDto } from './dto/create-footer-info.dto';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}
  @Get()
  async getFooterData(@Query('lang') lang: string) {
    return this.footerService.getFooterData(lang);
  }

  @Get('all')
  async getAllFooterData() {
    return this.footerService.getAllFooterData();
  }

  // remain upload image
  @Patch(':id')
  async updateFooter(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFooterInfoDto: CreateFooterInfoDto,
  ) {
    return this.footerService.updateFooter(id, createFooterInfoDto);
  }
}
