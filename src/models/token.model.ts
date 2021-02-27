import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class tokenModel {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}
