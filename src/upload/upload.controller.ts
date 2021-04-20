import { ForbiddenException } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('upload')
export class UploadController {
  @Get('/')
  getIndex(): string {
    throw new ForbiddenException();
  }

  @Post('/document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocumentFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    console.log(file);
    return true;
  }
}
