import { NotFoundException, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { Roles } from 'src/decorators/roles';
import { getSemester } from 'src/models/Query/getSemester';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class DocumentsResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  // @Roles('User')
  @Query(() => [getSemester])
  async getSemester(): Promise<getSemester[]> {
    const getSemester = await this.prisma.semester.findMany({
      orderBy: {
        semesterName: 'desc',
      },
    });
    if (!getSemester) throw new NotFoundException('ไม่พบข้อมูลในระบบ');

    return getSemester;
  }
}
