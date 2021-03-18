import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentsResolver } from './documents.resolver';

@Module({
  imports: [PrismaService],
  providers: [PrismaService, DocumentsResolver],
})
export class DocumentsModule {}
