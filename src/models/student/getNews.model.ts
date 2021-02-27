import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getNewsModel {
  @Field()
  id: String;

  @Field({ nullable: true })
  newsTitle: String;

  @Field({ nullable: true })
  newsDetails: String;

  @Field({ nullable: true })
  newsImage: String;

  @Field({ nullable: true })
  newsUrl: String;

  @Field({ nullable: true })
  newsType: String;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
