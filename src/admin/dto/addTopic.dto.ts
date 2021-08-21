import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AddTopicDto {
  @Field()
  @IsNumber()
  subCategoryId: number;

  @Field()
  @IsString()
  @MinLength(5, { message: 'TopicName is too short' })
  @MaxLength(1500, { message: 'TopicName is too long' })
  topicName: string;
}
