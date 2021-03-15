import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { getAppVersionModel } from 'src/models/getAppVersion.model';
import { tokenModel } from 'src/models/token.model';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  sayHello(): string {
    return 'It Work!';
  }
}
