import { Module } from '@nestjs/common';
import { HeaderService } from './header.service';
import { HeaderController } from './header.controller';
import { FileService } from 'src/app/services/file.service';

@Module({
  controllers: [HeaderController],
  providers: [HeaderService, FileService],
})
export class HeaderModule {}
