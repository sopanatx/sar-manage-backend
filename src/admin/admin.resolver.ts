import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { Roles } from 'src/decorators/roles';
import { GetUser } from 'src/shared/decorators/decorators';
import { AdminService } from './admin.service';
import { AdminUpdateUserDto } from './dto/AdminUpdateUser.dto';
import { UserModel } from './models/User.model';

@Resolver()
/*
TODO:

- Find all user and edit user infomation
- Add user and then send credentials email to user
- Get All user file and Counter
- Add Semester
- Add SubCategory , Topic
- Turned on / off Login System

*/
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}
  @Query(() => [UserModel])
  @UseGuards(GqlAuthGuard)
  async AdminGetAllUser(@GetUser() getUser): Promise<UserModel[]> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminGetAllUserService();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async AdminUpdateUser(
    @Args('AdminUpdateUser') adminUpdateUserDto: AdminUpdateUserDto,
    @GetUser() getUser,
  ): Promise<UserModel> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminUpdateUser(adminUpdateUserDto);
  }
}
