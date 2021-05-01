import { Field, ObjectType } from '@nestjs/graphql';
import { primaryMenu } from './PrimaryMenu';

@ObjectType()
export class getServiceStatus {
  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  serviceName: string;

  @Field({ nullable: true })
  isInMaintenance: boolean;
}
