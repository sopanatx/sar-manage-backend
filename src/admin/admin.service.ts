import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminCreateUserDto } from './dto/AdminCreateUser.dto';
import { AdminUpdateUserDto } from './dto/AdminUpdateUser.dto';
import { UserModel } from './models/User.model';
import * as bcrypt from 'bcrypt';
import { AdminGetUserDto } from './dto/AdminGetUser';
import sendMail from 'src/shared/mail.service';
import { AdminCreateSemesterDto } from './dto/AdminCreateSemester.dto';
import { AdminDeleteUserDto } from './dto/AdminDeleteUser.dto';
import { AddSubCategoryDto } from './dto/addSubCategory.dto';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { Mutation } from '@nestjs/graphql';
import { GetUser } from 'src/shared/decorators/decorators';
import { AddTopicDto } from './dto/addTopic.dto';
import { SemesterModel } from './models/Semester.model';
import { DeleteSemesterDto } from './dto/deleteSemester.dto';
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async AdminGetAllUserService(): Promise<UserModel[]> {
    return await this.prisma.account.findMany({
      where: {
        isDeleted: false,
      },

      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        userLevel: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async AdminUpdateUser(
    adminUpdateUser: AdminUpdateUserDto,
  ): Promise<UserModel> {
    const { userId, fullname, email, username, userLevel } = adminUpdateUser;

    const updateUser = await this.prisma.account.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        fullname,
        userLevel,
      },
    });
    await sendMail(
      'updateAccountByAdmin',
      updateUser.email,
      updateUser.fullname,
    );
    return updateUser;
  }

  async AdminCreateUser(adminCreateUser: AdminCreateUserDto): Promise<boolean> {
    const { email, username, password, fullname, userLevel } = adminCreateUser;
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        email: true,
      },
    });

    if (getUser) {
      throw new ConflictException('This account already exists');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    try {
      const saveUser = await this.prisma.account.create({
        data: {
          username: username,
          password: hash,
          passwordSalt: salt,
          email: email,
          fullname: fullname,
          userLevel: userLevel,
        },
      });
      return true;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async AdminGetUser(adminGetUser: AdminGetUserDto): Promise<UserModel> {
    const { userId } = adminGetUser;
    const getUser = await this.prisma.account.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        userLevel: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!getUser) throw new NotFoundException('User does not exist.');
    return getUser;
  }

  async AdminDeleteUser(
    adminDeleteUserDto: AdminDeleteUserDto,
  ): Promise<boolean> {
    const { userId } = adminDeleteUserDto;
    try {
      await this.prisma.account.update({
        where: {
          id: userId,
        },
        data: {
          isDeleted: true,
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async AdminCreateSemester(
    adminCreateSemesterDto: AdminCreateSemesterDto,
  ): Promise<boolean> {
    const { semester } = adminCreateSemesterDto;
    const getSemester = await this.prisma.semester.findUnique({
      where: {
        semesterName: semester,
      },
    });

    if (getSemester)
      throw new ConflictException('This semester already exists');

    try {
      await this.prisma.semester.create({
        data: {
          semesterName: semester,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return true;
  }

  async AdminAddSubCategory(
    addSubCategoryDto: AddSubCategoryDto,
  ): Promise<boolean> {
    const { subCategoryName, categoryId } = addSubCategoryDto;

    const getSubCategory = await this.prisma.subCategory.findMany({
      where: {
        subCategoryName,
      },
    });
    if (getSubCategory)
      throw new ConflictException('This subcategory already exists');
    try {
      await this.prisma.subCategory.create({
        data: {
          categoryId: categoryId,
          subCategoryName,
          subCategoryDescription: '',
          isAvailable: true,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async AdminAddTopic(addTopicDto: AddTopicDto): Promise<boolean> {
    const { subCategoryId, topicName } = addTopicDto;

    const getTopic = await this.prisma.topic.findMany({
      where: {
        topicName: addTopicDto.topicName,
      },
    });
    if (getTopic) throw new ConflictException('This topic already exists');
    try {
      await this.prisma.topic.create({
        data: {
          topicName: topicName,
          subCategoryId,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async AdminGetAllSemester(): Promise<SemesterModel[]> {
    const getSemester = await this.prisma.semester.findMany({
      where: {
        isAvailable: false,
      },
    });
    return getSemester;
  }

  async AdminDeleteSemester(
    deleteSemesterDto: DeleteSemesterDto,
  ): Promise<boolean> {
    const { semesterId } = deleteSemesterDto;
    try {
      await this.prisma.semester.update({
        where: {
          id: semesterId,
        },
        data: {
          isAvailable: false,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
