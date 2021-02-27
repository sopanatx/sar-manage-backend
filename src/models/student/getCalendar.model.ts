import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getCalendarModel {
  @Field()
  id: String;

  @Field({ nullable: true })
  activityName: String;

  @Field({ nullable: true })
  activityDetail: String;

  @Field({ nullable: true })
  activityStartDate: Date;

  @Field({ nullable: true })
  activityEndDate: Date;

  @Field({ nullable: true })
  activityLocation: String;

  @Field({ nullable: true })
  activityImage: String;
}
