import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategories } from './subCategories';

@ObjectType()
export class getCategories {
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

  @Field((type) => [SubCategories], { nullable: true })
  SubCategory: SubCategories[];
}
