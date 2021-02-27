import { Args, Query, Resolver } from '@nestjs/graphql';
import { getAppVersionModel } from 'src/models/getAppVersion.model';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Query(() => getAppVersionModel)
  async getAppVersion(): Promise<getAppVersionModel> {
    return await this.appService.getAppVersion();
  }
}
