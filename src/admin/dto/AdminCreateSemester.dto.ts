import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
@InputType()
export class AdminCreateSemesterDto {
  @Field()
  @IsString()
  @MinLength(5, { message: 'ชื่อปีการศึกษา ต้องมีอย่างน้อย 5 ตัวอักษร' })
  @MaxLength(255)
  semester: string;
}
