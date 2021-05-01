import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsNumberString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
@InputType()
export class LocalAuthRegisterDto {
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
}
