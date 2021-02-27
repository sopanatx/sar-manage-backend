import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { getAllUserModel } from 'src/models/getAllUser.model';
import { tokenModel } from 'src/models/token.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
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
    //   if (!getUser) throw new NotFoundException('No user exist.');
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

  //  @Mutation(() => tokenModel)
  // async createUser(
  //   @Args('localAuthRegister') localAuthRegisterDto: LocalAuthRegisterDto,
  //  ): Promise<tokenModel> {}
}
