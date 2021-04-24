import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { getSemester } from 'src/models/Query/getSemester';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLUpload } from 'apollo-server-express';
import { GetUser } from 'src/shared/decorators/decorators';
import { DocumentsService } from './documents.service';
import { uploadFileModel } from './models/uploadFile.model';
import { CheckSemesterDto } from './dto/checkSemester.dto';
@Resolver()
export class DocumentsResolver {
  constructor(
    private prisma: PrismaService,
    private readonly documentService: DocumentsService,
  ) {}

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
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype },
    @GetUser() user,
  ): Promise<boolean> {
    return await this.documentService.fileUpload(
      createReadStream,
      filename,
      mimetype,
      user,
    );
  }

  @Mutation(() => Boolean)
  async checkSemester(
    @Args('checkSemester') checkSemester: CheckSemesterDto,
  ): Promise<boolean> {
    const { semester } = checkSemester;
    const getSemester = await this.prisma.semester.findUnique({
      where: {
        semesterName: semester,
      },
    });
    if (!getSemester) return false;
    return true;
  }
}
