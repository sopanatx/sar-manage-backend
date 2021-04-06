import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class childrenNav {
  @Field()
  id: number;

  @Field({ nullable: true })
  childrenName: string;

  @Field({ nullable: true })
  childrenUrl: string;

  @Field({ nullable: true })
  childrenDetails: string;

  @Field({ nullable: true })
  assignedRole: string;

  @Field({ nullable: true })
  isLocked: boolean;
}
