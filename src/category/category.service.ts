import { Injectable } from '@nestjs/common';
import { getCategories } from 'src/models/Query/getCategories';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<getCategories[]> {
    const getCategories = await this.prisma.category.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        SubCategory: true,
      },
      orderBy: {
        categoryName: 'asc',
      },
    });

    // this.prisma.subscribe
    return getCategories;
  }
}
