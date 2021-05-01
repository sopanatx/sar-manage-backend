import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getCalendarModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  activityName: string;

  @Field({ nullable: true })
  activityDetail: string;

  @Field({ nullable: true })
  activityStartDate: Date;

  @Field({ nullable: true })
  activityEndDate: Date;

  @Field({ nullable: true })
  activityLocation: string;

  @Field({ nullable: true })
  activityImage: string;
}
