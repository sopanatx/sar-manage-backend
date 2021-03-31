import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class SubCategories {
  @Field()
  id: number;

  @Field()
  subCategoryName?: String;

  @Field()
  subCategoryDescription?: String;

  @Field()
  isAvailable?: Boolean;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
