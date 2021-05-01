import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { FileUpload } from 'src/scalars/upload.scalar';
import { Field } from 'type-graphql';

@InputType()
export class uploadDocument {
  @Field()
  file: FileUpload;
}
