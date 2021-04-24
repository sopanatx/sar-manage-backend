import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream, stat } from 'fs';
import * as path from 'path';
import { minioClient } from '../service/minioClient';
@Injectable()
export class DocumentsService {
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
}
