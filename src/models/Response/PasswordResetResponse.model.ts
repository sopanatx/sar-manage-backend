import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class PasswordResetResponseModel {
  @Field()
  status: string;
  @Field()
  statusMessage: string;
}
