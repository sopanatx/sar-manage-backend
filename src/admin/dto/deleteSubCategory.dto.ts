import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class DeleteSubCategoryDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  subCategoryId: number;
}
