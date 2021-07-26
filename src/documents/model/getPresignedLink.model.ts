import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getPresignedLinkModel {
  @Field()
  presignedUrl: string;
}
