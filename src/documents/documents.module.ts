import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';

@Module({
  imports: [PrismaService],
  providers: [PrismaService, DocumentsResolver, DocumentsService],
})
export class DocumentsModule {}
