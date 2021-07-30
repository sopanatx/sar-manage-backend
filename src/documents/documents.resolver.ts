import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { getSemester } from 'src/models/Query/getSemester';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from 'src/shared/decorators/decorators';
import { DocumentsService } from './documents.service';
import { CheckSemesterDto } from './dto/checkSemester.dto';
import { SearchSemesterFile } from './dto/searchSemesterFile';
import { searchFileBySemesterModel } from './model/searchFileBySemester';
import { FindSemesterDto } from './dto/findSemester.dto';
import { GetDocumentByCategories } from './dto/getDocumentByCategories';
import { GetTopicBySubCategories } from './dto/getTopicBySubCategories.dto';
import { TopicModel } from './models/Topic.model';
import { GetUploadListByTopicDto } from './dto/getUploadListByTopic.dto';
import { UploadDocumentDto } from './dto/uploadDocuments';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { GetDocumentBySubCategory } from './dto/getDocumentBySubCategory.dto';
import { DocumentFileList } from './model/DocumentFileList.model';
import { UpdateDocumentDto } from './dto/UpdateDocument.dto';
import { semesterModel } from './model/semester.model';
import { FileUploadData } from './model/FileUploadData.model';
import { GetFileUploadListDto } from './dto/getFileUploadList.dto';
import { getPresignedLinkModel } from './model/getPresignedLink.model';
import { GetPresignedLinkDto } from './dto/getPreSignedLink.dto';
import { DeleteDocumentDto } from './dto/deleteDocument.dto';
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
      where: {
        isAvailable: true,
      },
    });
    if (!getSemester) throw new NotFoundException('ไม่พบข้อมูลในระบบ');

    return getSemester;
  }

  @Query(() => getSemester)
  async findSemester(
    @Args('findSemesterDto') findSemesterDto: FindSemesterDto,
  ): Promise<getSemester> {
    const { semester } = findSemesterDto;
    const getSemester = await this.prisma.semester.findUnique({
      where: {
        id: semester,
      },
    });
    return getSemester;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    upload: FileUpload,
    @Args('DocumentDetails') UploadDocumentDto: UploadDocumentDto,
    @GetUser() user,
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await upload;

    return await this.documentService.fileUpload(
      createReadStream,
      filename,
      mimetype,
      user,
      UploadDocumentDto,
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

  @UseGuards(GqlAuthGuard)
  @Query(() => semesterModel)
  async getSemesterById(
    @Args('CheckSemesterDto') checkSemesterDto: CheckSemesterDto,
  ): Promise<any> {
    const { id } = checkSemesterDto;
    return await this.prisma.semester.findUnique({ where: { id } });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [searchFileBySemesterModel])
  async searchFileBySemester(
    @Args('searchSemesterFile') searchSemesterFile: SearchSemesterFile,
    @GetUser() getUser,
  ): Promise<searchFileBySemesterModel[]> {
    console.log(getUser);
    return await this.documentService.searchFileByName(
      searchSemesterFile,
      getUser,
    );
  }

  @Query(() => String)
  async getDocumentByCategory(
    @Args('getDocumentByCategory') getDocument: GetDocumentByCategories,
  ): Promise<any> {
    const { documentId } = getDocument;

    return documentId;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [TopicModel])
  async getTopicBySubCategories(
    @Args('getTopicBySubCategories') getTopic: GetTopicBySubCategories,
  ): Promise<TopicModel[]> {
    return await this.documentService.getTopicDocument(getTopic);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Boolean)
  async getUploadListTopic(
    @Args('getUploadListByTopic') getUploadListByTopic: GetUploadListByTopicDto,
    @GetUser() getUser,
  ): Promise<any> {
    return await this.documentService.getDocumentUploaded(
      getUploadListByTopic,
      getUser.id,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [DocumentFileList])
  async getDocumentBySubCategory(
    @Args('GetDocumentBySubCategory')
    getDocumentBySubCategory: GetDocumentBySubCategory,
    @GetUser() getUser,
  ): Promise<DocumentFileList[]> {
    return this.documentService.getDocumentBySubCategory(
      getDocumentBySubCategory,
      getUser,
    );
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async UpdateDocument(
    @Args('UpdateDocumentDto') updateDocument: UpdateDocumentDto,
    @GetUser() getUser,
  ): Promise<any> {
    const { title, index, documentId } = updateDocument;

    console.log(title, documentId);

    return await this.documentService.UpdateDocument(updateDocument, getUser);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [FileUploadData])
  async getFileUploadList(
    @Args('GetFileUploadListDto') getFileUploadListDto: GetFileUploadListDto,
    @GetUser() getUser,
  ): Promise<FileUploadData[]> {
    return this.documentService.getFileUploadList(
      getFileUploadListDto,
      getUser,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => getPresignedLinkModel)
  async getPresignedLink(
    @Args('GetPresignedLinkDto') getPresignedLinkDto: GetPresignedLinkDto,
    @GetUser() getUser,
  ): Promise<getPresignedLinkModel> {
    return this.documentService.getPresignedLink(getPresignedLinkDto, getUser);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteDocument(
    @Args('DeleteDocumentDto') deleteDocumentDto: DeleteDocumentDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    return await this.documentService.deleteDocument(
      deleteDocumentDto,
      getUser,
    );
  }
}
