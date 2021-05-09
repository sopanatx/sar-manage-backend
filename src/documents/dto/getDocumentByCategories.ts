import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class GetDocumentByCategories {
  @Field()
  // @IsNumber()
  documentId: number;
}
