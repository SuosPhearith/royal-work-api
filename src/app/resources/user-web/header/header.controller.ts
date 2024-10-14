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
import { HeaderService } from './header.service';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { CreateOrgsTypeDto } from './dto/create-orgs-type.dto';
import { UpdateOrgsTypeDto } from './dto/update-orgs-type.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller('header')
export class HeaderController {
  constructor(private readonly headerService: HeaderService) {}

  @Get()
  async getHeader(@Query('lang') lang: string) {
    return this.headerService.getHeader(lang);
  }

  @Get('header-v2')
  async getHeaderV2(@Query('lang') lang: string) {
    return this.headerService.getHeaderV2(lang);
  }

  // header link

  @Get('header-link/:id')
  async getOneHeaderLink(@Param('id', ParseIntPipe) id: number) {
    return await this.headerService.getOneHeaderLink(id);
  }

  @Get('header-link')
  async getAllHeaderLink() {
    return await this.headerService.getAllHeaderLink();
  }

  // @Post('header-link')
  // async createHeaderLink(@Body() createHeaderDto: CreateHeaderDto) {
  //   return await this.headerService.createHeaderLink(createHeaderDto);
  // }

  @Patch('header-link/:id')
  async updateHeaderLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHeaderDto: UpdateHeaderDto,
  ) {
    return await this.headerService.updateHeaderLink(id, updateHeaderDto);
  }

  // @Delete('header-link/:id')
  // async deleteHeaderLink(@Param('id', ParseIntPipe) id: number) {
  //   return await this.headerService.deleteHeaderLink(id);
  // }

  // orgs type

  @Get('orgs-type/:id')
  async getOneOrgsType(@Param('id', ParseIntPipe) id: number) {
    return await this.headerService.getOneOrgsType(id);
  }

  @Get('orgs-type-by-header-link/:id')
  async getByHeaderLink(@Param('id', ParseIntPipe) id: number) {
    return await this.headerService.getByHeaderLink(id);
  }

  @Post('orgs-type')
  async createOrgsType(@Body() createOrgsTypeDto: CreateOrgsTypeDto) {
    return await this.headerService.createOrgsType(createOrgsTypeDto);
  }

  @Patch('orgs-type/:id')
  async updateOrgsType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrgsTypeDto: UpdateOrgsTypeDto,
  ) {
    return await this.headerService.updateOrgsType(id, updateOrgsTypeDto);
  }

  @Delete('orgs-type/:id')
  async deleteOrgsType(@Param('id', ParseIntPipe) id: number) {
    return await this.headerService.deleteOrgsType(id);
  }

  // logo

  @Get('logo')
  async getAllLogo() {
    return await this.headerService.getAllLogo();
  }

  @Patch('logo')
  async updateLogo(@Body() updateLogoDto: UpdateLogoDto) {
    return await this.headerService.updateLogo(updateLogoDto);
  }
  @Patch('logo-white')
  async updateLogoWhite(@Body() updateLogoDto: UpdateLogoDto) {
    return await this.headerService.updateLogoWhite(updateLogoDto);
  }
}
