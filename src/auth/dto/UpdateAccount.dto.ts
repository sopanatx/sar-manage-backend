import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateAccountDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  fullname: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  password: string;
}
