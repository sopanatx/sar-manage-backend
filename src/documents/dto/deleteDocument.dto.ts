import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteDocumentDto {
  @Field()
  @IsUUID()
  documentId: string;
}
