import { Injectable, NotFoundException } from '@nestjs/common';
import { getCategories } from 'src/models/Query/getCategories';
import { getNavMemu } from 'src/models/Query/getNavMenu';
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
        SubCategory: {
          include: {
            Topic: true,
          },
        },
      },
      orderBy: {
        categoryName: 'asc',
      },
    });

    return getCategories;
  }

  async getNavigation(): Promise<getNavMemu[]> {
    return this.prisma.navigationMenu.findMany({
      include: {
        ChildrenNavigationMenu: true,
      },
    });
  }
}
