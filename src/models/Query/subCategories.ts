import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';
import { Topic } from './topic';

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

  @Field((type) => [Topic], { nullable: true })
  Topic: Topic[];
}
