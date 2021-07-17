import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CheckSemesterDto {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(5)
  @IsOptional()
  semester: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  id: string;
}
