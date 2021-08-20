import { Field, ObjectType } from '@nestjs/graphql';
import { Topic } from './Topic.model';
@ObjectType()
export class GetSubCategoryInfoModel {
  @Field()
  id: number;

  @Field()
  subCategoryName?: string;

  @Field()
  subCategoryDescription?: string;

  @Field()
  isAvailable?: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
