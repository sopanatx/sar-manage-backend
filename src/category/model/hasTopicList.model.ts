import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HasTopicListModel {
  @Field()
  hasTopicList: boolean;

  @Field()
  topicCount: number;
}
