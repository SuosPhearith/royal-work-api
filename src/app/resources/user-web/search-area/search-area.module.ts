import { Module } from '@nestjs/common';
import { SearchAreaService } from './search-area.service';
import { SearchAreaController } from './search-area.controller';

@Module({
  controllers: [SearchAreaController],
  providers: [SearchAreaService],
})
export class SearchAreaModule {}
