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
import { MinistryService } from './ministry.service';
import { UpdateMinistryTitleDto } from './dto/update-ministry-title.dto';
import { CreateMinistryLogoDto } from './dto/create-ministry-logo.dto';

@Controller('ministry')
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}
  @Get()
  async getMinistryData(@Query('lang') lang: string) {
    return await this.ministryService.getMinistryData(lang);
  }

  @Get('/all')
  async getAllMinistryTitle() {
    return await this.ministryService.getAllMinistryTitle();
  }

  @Patch(':id')
  async updateMinistryTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMinistryTitleDto: UpdateMinistryTitleDto,
  ) {
    return await this.ministryService.updateMinistryTitle(
      id,
      updateMinistryTitleDto,
    );
  }

  // logo

  @Get('logo/all')
  async getAllMinistryLogo() {
    return await this.ministryService.getAllMinistryLogo();
  }

  @Post('logo')
  async createMinistryLogo(
    @Body() createMinistryLogoDto: CreateMinistryLogoDto,
  ) {
    return await this.ministryService.createMinistryLogo(createMinistryLogoDto);
  }

  @Delete('logo/:id')
  async deleteMinistryLogo(@Param('id', ParseIntPipe) id: number) {
    return await this.ministryService.deleteMinistryLogo(id);
  }

  @Get('logo/:id')
  async getOneMinistryLogo(@Param('id', ParseIntPipe) id: number) {
    return await this.ministryService.getOneMinistryLogo(id);
  }
}
