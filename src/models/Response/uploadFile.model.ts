import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('uploadFile')
export class uploadFile {
  @Field()
  success: boolean;
}
