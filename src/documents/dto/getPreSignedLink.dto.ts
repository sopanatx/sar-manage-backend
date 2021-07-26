import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetPresignedLinkDto {
  @Field()
  fileId: string;
}
