import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { getAllUserModel } from 'src/models/getAllUser.model';
import { tokenModel } from 'src/models/token.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { LocalAuthDto } from './dto/local-auth.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  @Query(() => [getAllUserModel])
  async getAllUser(): Promise<getAllUserModel[]> {
    const getUser = await this.prisma.account.findMany();
    console.log(getUser);
    if (!getUser) throw new NotFoundException();
    return getUser;
  }
  @Query(() => Number)
  async getAllUserCount(): Promise<number> {
    return await this.prisma.account.count();
  }

  @Mutation(() => tokenModel)
  async signInWithStudentEmail(
    @Args('localAuthDto') localAuthDto: LocalAuthDto,
  ): Promise<tokenModel> {
    return await this.authService.signInWithStudentEmail(localAuthDto);
  }
}
