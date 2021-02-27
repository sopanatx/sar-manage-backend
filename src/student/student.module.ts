import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [PrismaService],
  providers: [StudentResolver, StudentService, PrismaService],
})
export class StudentModule {}
