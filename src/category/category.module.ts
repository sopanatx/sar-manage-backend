import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [PrismaService],
  providers: [CategoryResolver, CategoryService, PrismaService],
})
export class CategoryModule {}
