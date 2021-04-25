import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class SearchSemesterFile {
  @Field()
  @IsUUID()
  semester: string;
}
