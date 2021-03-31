import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class SubCategories {
  @Field()
  id: number;

  @Field()
  subCategoryName?: string;

  @Field()
  subCategoryDescription?: string;

  @Field()
  isAvailable?: boolean;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
