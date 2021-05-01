import { Field, ObjectType } from '@nestjs/graphql';
import { getAllSubMenu } from './getSubmenu';
@ObjectType()
export class primaryMenu {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  primaryName: string;

  @Field({ nullable: true })
  isAvaliable: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  subMenu: getAllSubMenu;
}
