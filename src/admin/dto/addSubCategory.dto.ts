import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class AddSubCategoryDto {
  @Field()
  @IsString()
  @MaxLength(255)
  subCategoryName: string;

  @Field()
  @IsNumber()
  categoryId: number;
}
