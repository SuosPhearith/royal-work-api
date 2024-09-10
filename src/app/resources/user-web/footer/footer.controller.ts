import { Controller, Get, Query } from '@nestjs/common';
import { FooterService } from './footer.service';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}
  @Get()
  async getFooterData(@Query('lang') lang: string) {
    return this.footerService.getFooterData(lang);
  }
}
