import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream, stat, createReadStream } from 'fs';
import * as path from 'path';
import { getCategories } from 'src/models/Query/getCategories';
import { PrismaService } from 'src/prisma/prisma.service';
import { minioClient } from '../service/minioClient';
import { GetTopicBySubCategories } from './dto/getTopicBySubCategories.dto';
import { GetUploadListByTopicDto } from './dto/getUploadListByTopic.dto';
import { SearchSemesterFile } from './dto/searchSemesterFile';
import { searchFileBySemesterModel } from './model/searchFileBySemester';
import { GetTopicDocumentModel } from './models/getTopicDocument.model';
import { TopicModel } from './models/Topic.model';
import * as zlib from 'zlib';
import { GetDocumentBySubCategory } from './dto/getDocumentBySubCategory.dto';
import { DocumentFileList } from './model/DocumentFileList.model';
import { UpdateDocumentDto } from './dto/UpdateDocument.dto';
@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}
  async fileUpload(
    createReadStream,
    filename,
    mimetype,
    user,
    UploadDocumentDto,
  ): Promise<boolean> {
    const { title, index, semesterId, subCategoryId, topicId, categoryId } =
      UploadDocumentDto;
    console.log(user);
    const ext = path.extname(filename);
    const allowedFileExtensions = [
      '.pdf',
      '.jpeg',
      '.jpg',
      '.png',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
    ];
    if (!allowedFileExtensions.includes(ext))
      throw new BadRequestException('File type not allowed');
    //check file extension or mimetype is in allowed array]
    //if not then throw error to user about wrong file
    //TODO: Change filename and upload to s3
    filename = user.username + '_' + Date.now() + `_0` + ext;

    const checkIsReplaceIndex = await this.prisma.fileUploadData.findMany({
      where: {
        TopicId: topicId,
        index: index,
        authorId: user.id,
        semesterId,
      },
    });
    const getCategoryList = await this.prisma.subCategory.findUnique({
      where: { id: subCategoryId },
      include: {
        categories: true,
      },
    });

    console.log(getCategoryList);
    if (checkIsReplaceIndex.length > 0)
      throw new ConflictException(
        'หัวข้อดังกล่าวในปีการศึกษานี้มีเอกสารซ้ำอยู่แล้ว',
      );
    try {
      const createFileList = await this.prisma.fileUploadData.create({
        data: {
          index,
          title: title,
          filename: filename,
          fileUrl: '',
          semesterId: semesterId,
          subCategoryId: getCategoryList.id,
          TopicId: topicId,
          categoryId: getCategoryList.categories.id,
          authorId: user.id,
        },
      });

      const gzipFile = await createReadStream();
      return await new Promise(async (resolve, reject) =>
        minioClient.putObject(
          'sar-dev',
          filename,
          gzipFile,
          //    stat.size,
          // 'audio/ogg',
          function (e) {
            if (e) {
              reject(false);
            } else {
              resolve(true);
            }
            console.log(
              'Successfully uploaded to storage.itpsru.in.th --> user: %s filename:',
              user.username,
              filename,
            );
          },
        ),
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async searchFileByName(
    searchFileByName: SearchSemesterFile,
  ): Promise<searchFileBySemesterModel[]> {
    const { semester } = searchFileByName;
    console.log(semester);

    const getFileByCategories = await this.prisma.category.findMany({
      include: {
        FileUploadData: {
          where: { semesterId: semester },
          select: {
            index: true,
          },
        },
      },
      orderBy: {
        categoryName: 'asc',
      },
    });

    console.log(getFileByCategories);
    return getFileByCategories;
  }
  async getTopicDocument(
    getTopic: GetTopicBySubCategories,
  ): Promise<TopicModel[]> {
    const { subCategoryId } = getTopic;
    const getTopicList = await this.prisma.topic.findMany({
      where: {
        subCategoryId,
      },
    });
    console.log(getTopicList);
    return getTopicList;
  }

  async getDocumentUploaded(
    getUploadListByTopicDto: GetUploadListByTopicDto,
    userId,
  ): Promise<any> {
    const { topicId, semester, categoryId, subCategoryId } =
      getUploadListByTopicDto;
    if (!topicId) {
      const getUploadList = await this.prisma.fileUploadData.findMany({
        where: {
          subCategoryId: subCategoryId,
          authorId: userId,
          semesterId: semester,
        },
        include: {
          SubCategory: true,
        },
        orderBy: {
          index: 'desc',
        },
      });
      console.log(getUploadList);
    } else {
      const getUploadList = await this.prisma.fileUploadData.findMany({
        where: {
          subCategoryId: subCategoryId,
          authorId: userId,
          TopicId: topicId ? topicId : 0,
          semesterId: semester,
        },
        include: {
          SubCategory: true,
        },
        orderBy: {
          index: 'desc',
        },
      });
      console.log(getUploadList);
    }
    return true;
  }

  async getDocumentBySubCategory(
    getDocumentBySubCategory: GetDocumentBySubCategory,
    getUser,
  ): Promise<DocumentFileList[]> {
    const { subCategoryId, semesterId } = getDocumentBySubCategory;
    const getDoc = await this.prisma.fileUploadData.findMany({
      where: {
        subCategoryId,
        semesterId,
        authorId: getUser.id,
      },
      include: {
        SubCategory: true,
      },
    });
    return getDoc;
  }

  async UpdateDocument(updateDocumentDto: UpdateDocumentDto): Promise<boolean> {
    const { semesterId, documentId } = updateDocumentDto;

    return true;
  }
}
