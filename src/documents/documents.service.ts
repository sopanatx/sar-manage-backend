import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import * as path from 'path';
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
    filename = user.getUser.username + '_' + Date.now() + '_' + ext;
    console.log(mimetype);
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./tmp/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}
