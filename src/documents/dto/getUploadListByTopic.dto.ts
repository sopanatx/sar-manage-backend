import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class GetUploadListByTopicDto {
  @IsOptional()
  @Field({ nullable: true })
  topicId: number;

  @Field()
  @IsUUID()
  semester: string;

  @Field()
  @IsNumber()
  categoryId: number;

  @Field()
  @IsNumber()
  subCategoryId: number;
}
