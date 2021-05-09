import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class TopicModel {
  @Field({ nullable: true })
  topicName: string;

  @Field({ nullable: true })
  topicDetails: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
