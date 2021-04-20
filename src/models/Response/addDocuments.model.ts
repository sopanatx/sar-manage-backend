import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class addDocumentModel {
  @Field()
  status: string;
  @Field()
  statusMessage: string;
}
