import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MyAccountModel {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  fullname: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
