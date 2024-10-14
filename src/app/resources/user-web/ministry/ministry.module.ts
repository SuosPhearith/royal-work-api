import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { MinistryController } from './ministry.controller';
import { FileService } from 'src/app/services/file.service';

@Module({
  controllers: [MinistryController],
  providers: [MinistryService, FileService],
})
export class MinistryModule {}
