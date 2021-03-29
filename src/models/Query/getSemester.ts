import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class getSemester {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  semesterName: string;

  @Field({ nullable: true })
  isAvaliable: boolean;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
