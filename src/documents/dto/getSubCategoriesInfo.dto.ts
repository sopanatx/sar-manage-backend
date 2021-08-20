import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class GetSubCategoriesInfoDto {
  @Field()
  @IsNumber()
  id: number;
}
