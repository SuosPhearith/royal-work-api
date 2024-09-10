import { Module } from '@nestjs/common';
import { ListDocsService } from './list-docs.service';
import { ListDocsController } from './list-docs.controller';

@Module({
  controllers: [ListDocsController],
  providers: [ListDocsService],
})
export class ListDocsModule {}
