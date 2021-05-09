import { Field, ObjectType } from '@nestjs/graphql';
import { TopicModel } from './Topic.Model';
@ObjectType()
export class GetTopicDocumentModel {
  // @Field()
  // hasTopic: boolean;

  @Field((type) => [TopicModel], { nullable: true })
  getTopicList: TopicModel[];
}
