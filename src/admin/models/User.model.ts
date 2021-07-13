import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  fullname: string;

  @Field()
  userLevel: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
