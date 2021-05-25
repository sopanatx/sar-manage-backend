import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream, stat } from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { minioClient } from '../service/minioClient';
import { GetTopicBySubCategories } from './dto/getTopicBySubCategories.dto';
import { GetUploadListByTopicDto } from './dto/getUploadListByTopic.dto';
import { SearchSemesterFile } from './dto/searchSemesterFile';
import { searchFileBySemesterModel } from './model/searchFileBySemester';
import { GetTopicDocumentModel } from './models/getTopicDocument.model';
import { TopicModel } from './models/Topic.model';
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
    let ext = path.extname(filename);
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
    const fileStream = await createReadStream(filename);

    try {
      await minioClient.putObject(
        'sar-dev',
        filename,
        fileStream,
        //    stat.size,
        // 'audio/ogg',
        function (e) {
          if (e) {
            return console.log(e);
          }
          console.log(
            'Successfully uploaded to storage.itpsru.in.th --> user: %s filename:',
            user.username,
            filename,
          );
        },
      );
    } catch (e) {
      throw new InternalServerErrorException(
        'ไม่สามารถจัดเก็บไฟล์ใน Object Storage ได้. โปรดลองใหม่อีกครั้ง',
      );
    }

    try {
      const checkIsReplaceIndex = await this.prisma.fileUploadData.findMany({
        where: {
          TopicId: topicId,
          index: index,
        },
      });
      if (checkIsReplaceIndex.length > 0) throw new ConflictException();
      const createFileList = await this.prisma.fileUploadData.create({
        data: {
          index,
          filename: title,
          fileUrl: '',
          semesterId: semesterId,
          subCategoryId: +subCategoryId,
          TopicId: topicId,
          categoryId: categoryId,
          authorId: user.id,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'ไม่สามารถอัปโหลดเอกสารได้ เนื่องจากข้อผิดพลาดบางประการ โปรดตรวจสอบว่าลำดับ / ชื่อเอกสารถูกต้องหรือไม่',
      );
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
          TopicId: topicId,
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
}
