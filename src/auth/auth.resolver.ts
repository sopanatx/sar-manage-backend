import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { getAllUserModel } from 'src/models/getAllUser.model';
import { tokenModel } from 'src/models/token.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from 'src/shared/decorators/decorators';
import { AuthService } from './auth.service';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
import { LocalAuthDto } from './dto/local-auth.dto';
import { GqlAuthGuard } from './strategy/graphql-auth.guard';
import { AuthenticationError } from 'apollo-server';
@Resolver()
export class AuthResolver {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => tokenModel)
  async signIn(
    @Args('localAuthDto') localAuthDto: LocalAuthDto,
  ): Promise<tokenModel> {
    console.log(localAuthDto);
    return this.authService.signIn(localAuthDto);
  }

  @Mutation(() => tokenModel)
  async signUp(
    @Args('localAuthRegisterDto') localAuthRegisterDto: LocalAuthRegisterDto,
  ): Promise<any> {
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
