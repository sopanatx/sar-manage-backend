import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategoryModel } from './SubCategory.model';

@ObjectType()
export class CategoryModel {
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

  @Field((type) => [SubCategoryModel], { nullable: true })
  SubCategory: SubCategoryModel[];
}
