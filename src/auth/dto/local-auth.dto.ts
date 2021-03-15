import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LocalAuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Field()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @Field()
  password: string;
}
