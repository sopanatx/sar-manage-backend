import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Topic {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  topicName?: string;

  @Field({ nullable: true })
  topicDetails?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
