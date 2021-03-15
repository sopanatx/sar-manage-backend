import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocalAuthDto } from 'src/auth/dto/local-auth.dto';
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

  @Mutation(() => tokenModel)
  async signIn(
    @Args('localAuthDto') localAuthDto: LocalAuthDto,
  ): Promise<tokenModel> {
    console.log(localAuthDto);
    return {
      accessToken: localAuthDto.username,
      refreshToken: localAuthDto.password,
    };
  }
}
