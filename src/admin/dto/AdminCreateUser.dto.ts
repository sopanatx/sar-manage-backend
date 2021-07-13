import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AdminCreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @Field()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Field()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Field()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  userLevel: string;
}
