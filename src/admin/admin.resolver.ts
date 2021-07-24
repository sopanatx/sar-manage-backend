import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { Roles } from 'src/decorators/roles';
import { GetUser } from 'src/shared/decorators/decorators';
import { AdminService } from './admin.service';
import { AddSubCategoryDto } from './dto/addSubCategory.dto';
import { AddTopicDto } from './dto/addTopic.dto';
import { AdminCreateSemesterDto } from './dto/AdminCreateSemester.dto';
import { AdminCreateUserDto } from './dto/AdminCreateUser.dto';
import { AdminDeleteUserDto } from './dto/AdminDeleteUser.dto';
import { AdminGetUserDto } from './dto/AdminGetUser';
import { AdminUpdateUserDto } from './dto/AdminUpdateUser.dto';
import { DeleteSemesterDto } from './dto/deleteSemester.dto';
import { DeleteSubCategoryDto } from './dto/deleteSubCategory.dto';
import { CategoryModel } from './models/Category.model';
import { SemesterModel } from './models/Semester.model';
import { SubCategoryModel } from './models/SubCategory.model';
import { UserModel } from './models/User.model';

@Resolver()
/*
TODO:

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminCreateUser(
    @Args('AdminCreateUserDto') adminCreateUser: AdminCreateUserDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminCreateUser(adminCreateUser);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async AdminGetUser(
    @Args('AdminGetUserDto') adminGetUser: AdminGetUserDto,
    @GetUser() getUser,
  ): Promise<UserModel> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminGetUser(adminGetUser);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminCreateSemester(
    @Args('AdminCreateSemesterDto')
    adminCreateSemesterDto: AdminCreateSemesterDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );

    return await this.adminService.AdminCreateSemester(adminCreateSemesterDto);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminDeleteUser(
    @Args('AdminDeleteUserDto') adminDeleteUserDto: AdminDeleteUserDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminDeleteUser(adminDeleteUserDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminAddTopic(
    @Args('addTopicDto') addTopicDto: AddTopicDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    {
      if (getUser.role != 'Admin')
        throw new UnauthorizedException(
          `Your account not have permission to access this menu`,
        );
      return await this.adminService.AdminAddTopic(addTopicDto);
    }
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [SemesterModel])
  async AdminGetAllSemester(@GetUser() getUser): Promise<SemesterModel[]> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminGetAllSemester();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminDeleteSemester(
    @Args('AdminDeleteSemesterDto') deleteSemester: DeleteSemesterDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        'Your account not have permission to access this menu',
      );
    return await this.adminService.AdminDeleteSemester(deleteSemester);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [SubCategoryModel])
  async AdminGetAllSubCategory(
    @GetUser() getUser,
  ): Promise<SubCategoryModel[]> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminGetAllSubCategory();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [CategoryModel])
  async AdminGetAllCategory(@GetUser() getUser): Promise<CategoryModel[]> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminGetAllCategory();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminAddSubCategory(
    @Args('AddSubCategoryDto')
    addSubCategoryDto: AddSubCategoryDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminAddSubCategory(addSubCategoryDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async AdminDeleteSubCategory(
    @Args('DeleteSubCategoryDto') deleteSubCategoryDto: DeleteSubCategoryDto,
    @GetUser() getUser,
  ): Promise<boolean> {
    if (getUser.role != 'Admin')
      throw new UnauthorizedException(
        `Your account not have permission to access this menu`,
      );
    return await this.adminService.AdminDeleteSubCategory(deleteSubCategoryDto);
  }
}
