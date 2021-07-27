import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateDocumentDto {
  @Field()
  @IsUUID()
  documentId: string;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  index: string;
}
