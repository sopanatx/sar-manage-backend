import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PasswordResetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Field()
  username: string;
}
