import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { Roles } from 'src/decorators/roles';
import { getSemester } from 'src/models/Query/getSemester';
import { addDocumentModel } from 'src/models/Response/addDocuments.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { uploadDocument } from './dto/uploadDocuments';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { BadRequestException } from '@nestjs/common';

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
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype },
  ): Promise<boolean> {
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const allowedFileExtensions = [
      'pdf',
      'jpeg',
      'jpg',
      'png',
      'doc',
      'docx',
      'xls',
      'txt',
      'xlsx',
    ];
    const filetype = filename.split('.')[1];

    //check file extension or mimetype is in allowed array]
    //if not then throw error to user about wrong file
    if (
      !mimetype.includes(allowedMimeTypes) ||
      !filetype.includes(allowedFileExtensions)
    )
      throw new BadRequestException('File type not allowed');

    //TODO: Change filename and upload to s3 Storage
    filename = Date.now() + '.' + filetype;
    console.log(mimetype);
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./tmp/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}
