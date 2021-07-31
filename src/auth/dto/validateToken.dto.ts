import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class ValidateTokenDto {
  @Field()
  @IsString()
  token: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;
}
