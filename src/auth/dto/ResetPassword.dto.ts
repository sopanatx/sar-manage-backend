import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordDto {
  @Field()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @Field()
  @IsString()
  @MaxLength(255)
  token: string;
}
