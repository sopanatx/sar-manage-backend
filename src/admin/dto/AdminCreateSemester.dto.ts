import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
@InputType()
export class AdminCreateSemesterDto {
  @Field()
  @IsString()
  semester: string;
}
