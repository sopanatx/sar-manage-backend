import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class uploadFileModel {
  @Field()
  status: boolean;

  @Field({ nullable: true })
  filename: string;
}
