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
import { PasswordResetResponseModel } from 'src/models/Response/PasswordResetResponse.model';
import { PasswordResetDto } from './dto/PasswordReset.dto';
import { UserIp } from 'src/decorators/getIP';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';
import { MyAccountModel } from './model/myaccount.model';
import { ValidateTokenDto } from './dto/validateToken.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';
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
    return this.authService.signIn(localAuthDto);
  }

  @Mutation(() => tokenModel)
  async signUp(
    @Args('localAuthRegisterDto') localAuthRegisterDto: LocalAuthRegisterDto,
  ): Promise<any> {
    return this.authService.signUp(localAuthRegisterDto);
  }

  @Mutation(() => PasswordResetResponseModel)
  async requestPasswordReset(
    @Args('PasswordResetDto') passwordResetDto: PasswordResetDto,
    @UserIp() ip,
  ): Promise<PasswordResetResponseModel> {
    console.log('Password Requested From IP:', ip);
    return this.authService.PasswordReset(passwordResetDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async UpdateAccountInfo(
    @Args('UpdateAccount') updateAccountDto: UpdateAccountDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    return await this.authService.UpdateAccountInfo(updateAccountDto, getUser);
  }

  @Query(() => MyAccountModel)
  @UseGuards(GqlAuthGuard)
  async MyAccountInfo(@GetUser() getUser): Promise<MyAccountModel> {
    return await this.authService.MyProfileInfo(getUser);
  }

  @Query(() => Boolean)
  async validatePasswordResetToken(
    @Args('ValidatePasswordToken') validatePasswordToken: ValidateTokenDto,
  ): Promise<boolean> {
    return await this.authService.validateToken(validatePasswordToken);
  }

  @Mutation(() => Boolean)
  async ResetPassword(
    @Args('ResetPasswordDto') resetPasswordDto: ResetPasswordDto,
  ): Promise<boolean> {
    return await this.authService.ResetPassword(resetPasswordDto);
  }
}
