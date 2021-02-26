import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'Account' })
export class getAllUserModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  studentId: string;

  @Field()
  @Column()
  studentFirstName: string;

  @Field()
  @Column()
  studentLastName: string;

  @Field()
  @Column()
  studentEmail: string;

  @Field()
  @Column()
  isBanned: boolean;

  @Field()
  @Column()
  userLevel: string;

  @Field()
  @Column()
  lastLogin: Date;
}
