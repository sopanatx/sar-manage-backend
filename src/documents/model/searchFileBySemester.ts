import { Field, ObjectType } from '@nestjs/graphql';
import { FileUploadDataByName } from './FileUploadDataByName';
@ObjectType()
export class searchFileBySemesterModel {
  @Field()
  id: number;

  @Field()
  categoryName: string;

  @Field()
  isAvailable: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => [FileUploadDataByName], { nullable: true })
  FileUploadData: FileUploadDataByName[];
}
