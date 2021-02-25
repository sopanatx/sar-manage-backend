import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getAppVersionModel {
  @Field()
  statusCode: number;

  @Field()
  status: string;

  @Field({ nullable: true })
  serverZone?: string;

  @Field({ nullable: true })
  version?: string;

  @Field({ nullable: true })
  allowedMinimumVersion?: string;

  @Field({ nullable: true })
  versionCode?: number;

  @Field({ nullable: true })
  allowedMinimunVersionCode?: number;

  @Field({ nullable: true })
  isAllowedOlderVersion?: boolean;

  @Field({ nullable: true })
  apiServerType?: string;

  @Field({ nullable: true })
  isInMaintenance: boolean;
}
