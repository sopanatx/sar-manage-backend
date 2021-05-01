import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class Topic {
  @Field()
  id: number;

  @Field()
  topicName?: string;

  @Field()
  topicDetails?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
