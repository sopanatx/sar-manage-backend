import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AdminUpdateTopicDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  topicId: number;

  @Field()
  @IsString({ message: '标题不能为空' })
  @MinLength(4, { message: 'TopicName must be at least 4 characters' })
  @MaxLength(50, { message: 'TopicName must be less than 50 characters' })
  topicName: string;
}
