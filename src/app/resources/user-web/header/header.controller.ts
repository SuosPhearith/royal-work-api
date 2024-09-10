import { Controller, Get, Query } from '@nestjs/common';
import { HeaderService } from './header.service';

@Controller('header')
export class HeaderController {
  constructor(private readonly headerService: HeaderService) {}

  @Get()
  async getHeader(@Query('lang') lang: string) {
    return this.headerService.getHeader(lang);
  }
}
