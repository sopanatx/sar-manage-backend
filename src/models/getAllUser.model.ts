import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getAllUserModel {
  @Field()
  id: string;

  @Field()
  studentId: string;

  @Field()
  studentFirstName: string;

  @Field()
  studentLastName: string;

  @Field()
  studentEmail: string;

  @Field()
  isBanned: boolean;

  @Field()
  userLevel: string;

  @Field()
  lastLogin: Date;
}
