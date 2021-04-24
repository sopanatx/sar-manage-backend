import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CheckSemesterDto {
  @Field()
  @IsString()
  @MaxLength(5)
  semester: string;
}
