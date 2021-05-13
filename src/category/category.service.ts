import { Injectable, NotFoundException } from '@nestjs/common';
import { getCategories } from 'src/models/Query/getCategories';
import { getNavMemu } from 'src/models/Query/getNavMenu';
import { PrismaService } from 'src/prisma/prisma.service';
import { HasTopicListDto } from './dto/hasTopicList.dto';
import { HasTopicListModel } from './model/hasTopicList.model';

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
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        id: 'asc',
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

  async getHasTopicList(
    getHasTopicList: HasTopicListDto,
  ): Promise<HasTopicListModel> {
    const { subCategoryId } = getHasTopicList;
    const getTopic = await this.prisma.topic.findMany({
      where: {
        subCategoryId: subCategoryId,
      },
    });
    console.log(getTopic);

    // return {
    //   hasTopicList: getTopic.length == 0 ? false : true,
    // };
    return {
      hasTopicList: getTopic.length == 0 ? false : true,
      topicCount: getTopic.length,
    };
  }
}
