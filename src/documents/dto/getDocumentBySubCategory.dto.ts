import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class GetDocumentBySubCategory {
  @Field()
  @IsNumber()
  subCategoryId: number;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  semesterId: string;
}
