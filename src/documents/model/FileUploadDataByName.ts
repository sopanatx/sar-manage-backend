import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class FileUploadDataByName {
  @Field()
  index: string;
}
