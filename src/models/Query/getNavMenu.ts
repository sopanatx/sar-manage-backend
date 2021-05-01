import { Field, ObjectType } from '@nestjs/graphql';
import { childrenNav } from './children';

@ObjectType()
export class getNavMemu {
  @Field()
  id: number;

  @Field()
  navigationName: string;

  @Field({ nullable: true })
  navigationUrl: string;

  @Field()
  assignedRole: string;

  @Field()
  isLocked: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => [childrenNav], { nullable: true })
  ChildrenNavigationMenu: childrenNav[];
}
