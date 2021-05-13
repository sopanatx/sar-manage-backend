import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class HasTopicListDto {
  @IsNumber()
  @Field()
  subCategoryId: number;
}
