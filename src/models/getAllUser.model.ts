import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getAllUserModel {
  @Field()
  studentId: string;

  @Field()
  studentFirstName: string;

  @Field()
  studentLastName: string;

  @Field()
  studentEmail: string;
}
