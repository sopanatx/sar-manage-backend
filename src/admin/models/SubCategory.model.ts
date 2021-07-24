import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from './Category.model';
@ObjectType()
export class SubCategoryModel {
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
