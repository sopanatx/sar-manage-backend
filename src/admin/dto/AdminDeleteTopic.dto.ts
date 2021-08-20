import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AdminDeleteTopicDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  topicId: string;
}
