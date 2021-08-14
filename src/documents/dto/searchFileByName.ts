import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchFileByNameDto {
  @Field()
  name: string;
}
