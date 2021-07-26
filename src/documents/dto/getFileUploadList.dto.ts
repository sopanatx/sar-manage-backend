import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class GetFileUploadListDto {
  @Field()
  @IsNumber()
  subCategoryId: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  TopicId: number;

  @Field()
  @IsUUID()
  semesterId: string;
}
