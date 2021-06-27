import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class SubCategory {
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
