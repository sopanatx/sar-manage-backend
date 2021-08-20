import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class Topic {
  @Field()
  id: number;

  @Field({ nullable: true })
  topicName?: string;

  @Field({ nullable: true })
  topicDetails?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  isDeleted: boolean;
}
