import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class AdminUpdateUserDto {
  @Field()
  @IsUUID()
  userId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fullname: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  username: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  userLevel: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  password: string;
}
