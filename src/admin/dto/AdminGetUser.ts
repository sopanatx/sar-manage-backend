import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class AdminGetUserDto {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  userId: string;
}
