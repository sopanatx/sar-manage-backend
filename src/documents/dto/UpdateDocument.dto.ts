import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateDocumentDto {
  @Field()
  @IsUUID()
  semesterId: string;

  @Field()
  @IsUUID()
  documentId: string;
}
