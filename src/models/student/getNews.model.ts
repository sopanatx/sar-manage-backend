import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getNewsModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  newsTitle: string;

  @Field({ nullable: true })
  newsDetails: string;

  @Field({ nullable: true })
  newsImage: string;

  @Field({ nullable: true })
  newsUrl: string;

  @Field({ nullable: true })
  newsType: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
