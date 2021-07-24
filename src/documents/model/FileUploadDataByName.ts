import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
@ObjectType()
export class FileUploadDataByName {
  @Field()
  index: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
