import { InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class addCategoryDto {
  @IsString()
  @MaxLength(50)
  categoryName: string;
}
