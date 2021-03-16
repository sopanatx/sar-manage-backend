import { Module } from '@nestjs/common';
import { DocumentsResolver } from './documents.resolver';

@Module({
  providers: [DocumentsResolver]
})
export class DocumentsModule {}
