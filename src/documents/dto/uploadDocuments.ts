import { InputType, Field } from '@nestjs/graphql';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { FileUpload } from 'src/scalars/upload.scalar';

@InputType()
export class UploadDocumentDto {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  index: string;

  @Field()
  @IsUUID()
  semesterId: string;

  @Field()
  @IsInt()
  subCategoryId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  topicId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  categoryId: number;
}
