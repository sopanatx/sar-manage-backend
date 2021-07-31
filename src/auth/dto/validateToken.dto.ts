import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class ValidateTokenDto {
  @Field()
  @IsUUID()
  token: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;
}
