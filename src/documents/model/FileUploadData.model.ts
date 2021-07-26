import { ObjectType, Field } from '@nestjs/graphql';
import { SubCategory } from './SubCategory.model';

@ObjectType()
export class FileUploadData {
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

  @Field({ nullable: true })
  TopicId?: number;

  @Field()
  categoryId: number;

  @Field()
  semesterId: string;

  @Field()
  subCategoryId: number;

  @Field()
  authorId: string;

  @Field()
  isDeleted: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;

  @Field((type) => SubCategory, { nullable: true })
  SubCategory: SubCategory;
}
