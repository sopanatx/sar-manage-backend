import { Args, Query, Resolver } from '@nestjs/graphql';
import { getAllSubMenu } from 'src/models/Query/getSubmenu';
import { primaryMenu } from 'src/models/Query/PrimaryMenu';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class DocumentsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [primaryMenu])
  async getAllPrimaryMenu(): Promise<any> {
    const getAllPrimaryMenu = await this.prisma.$queryRaw<primaryMenu>(
      'SELECT * FROM primaryMenu;',
    );
    return getAllPrimaryMenu;
  }

  @Query(() => [getAllSubMenu])
  async getSubmenu(): Promise<getAllSubMenu[]> {
    return await this.prisma.subMenu.findMany();
  }
}
