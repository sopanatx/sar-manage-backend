import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream, stat } from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { minioClient } from '../service/minioClient';
import { GetTopicBySubCategories } from './dto/getTopicBySubCategories';
import { SearchSemesterFile } from './dto/searchSemesterFile';
import { searchFileBySemesterModel } from './model/searchFileBySemester';
import { GetTopicDocumentModel } from './models/getTopicDocument.model';
import { TopicModel } from './models/Topic.Model';
@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}
  async fileUpload(
    createReadStream,
    filename,
    mimetype,
    user,
  ): Promise<boolean> {
    console.log(user);
    let ext = path.extname(filename);
    console.log({ ext });
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
    filename = user.getUser.username + '_' + Date.now() + `_0` + ext;
    console.log(mimetype);

    const fileStream = createReadStream(filename);

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
            user.getUser.username,
            filename,
          );
        },
      );
    } catch (e) {
      throw new InternalServerErrorException(
        'ไม่สามารถจัดเก็บไฟล์ใน Object Storage ได้. โปรดลองใหม่อีกครั้ง',
      );
    }

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./tmp/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
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
}
