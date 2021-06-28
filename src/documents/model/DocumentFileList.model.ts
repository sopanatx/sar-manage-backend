import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategory } from './SubCategory.model';
import { Topic } from './Topic.model';

@ObjectType()
export class DocumentFileList {
  @Field()
  id: string;

  @Field()
  index: string;

  @Field()
  title: string;

  @Field()
  filename: string;

  @Field({ nullable: true })
  fileUrl: string;

  @Field({ nullable: true })
  shortenUrl: string;

  @Field()
  TopicId: number;

  @Field()
  categoryId: number;

  @Field()
  semesterId: string;

  @Field()
  subCategoryId: number;

  @Field()
  authorId: string;

  @Field()
  isDeleted: Boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;

  @Field((type) => SubCategory, { nullable: true })
  SubCategory: SubCategory;
}
