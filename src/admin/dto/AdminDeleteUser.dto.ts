import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AdminDeleteUserDto {
  @Field()
  @IsUUID()
  userId: string;
}
