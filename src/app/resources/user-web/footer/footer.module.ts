import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { FileService } from 'src/app/services/file.service';

@Module({
  controllers: [FooterController],
  providers: [FooterService, FileService],
})
export class FooterModule {}
