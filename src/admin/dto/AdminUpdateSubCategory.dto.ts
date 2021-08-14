import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class AdminUpdateSubCategoryDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  subCategoryName: string;
}
