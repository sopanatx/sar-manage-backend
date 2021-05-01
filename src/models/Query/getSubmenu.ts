import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class getAllSubMenu {
  @Field()
  id: string;

  @Field({ nullable: true })
  subMenuName?: string;

  @Field({ nullable: true })
  privaryMenuId?: string;
}
