import { Controller, Get, Query } from '@nestjs/common';
import { MinistryService } from './ministry.service';

@Controller('ministry')
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}
  @Get()
  async getMinistryData(@Query('lang') lang: string) {
    return this.ministryService.getMinistryData(lang);
  }
}
