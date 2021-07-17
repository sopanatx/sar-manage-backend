import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class semesterModel {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  semesterName: string;

  @Field({ nullable: true })
  isAvailable: boolean;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
