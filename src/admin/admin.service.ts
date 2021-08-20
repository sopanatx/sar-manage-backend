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
import { SubCategoryModel } from './models/SubCategory.model';
import { CategoryModel } from './models/Category.model';
import { DeleteSubCategoryDto } from './dto/deleteSubCategory.dto';
import { AdminUpdateSubCategoryDto } from './dto/AdminUpdateSubCategory.dto';
import { AdminDeleteTopicDto } from './dto/AdminDeleteTopic.dto';
import { AdminUpdateTopicDto } from './dto/AdminUpdateTopic.dto';
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
        updatedAt: new Date(),
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
    const getSemester = await this.prisma.semester.findMany({
      where: {
        semesterName: semester,
        isAvailable: true,
      },
    });

    if (getSemester)
      throw new ConflictException('This semester already exists');

    try {
      await this.prisma.semester.create({
        data: {
          semesterName: semester,
          isAvailable: true,
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
        categoryId,
      },
    });
    if (getSubCategory.length > 0)
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
        subCategoryId,
        topicName: addTopicDto.topicName,
        isDeleted: false,
      },
    });
    if (getTopic.length > 0)
      throw new ConflictException('This topic already exists');
    const getSubCategory = await this.prisma.subCategory.findMany({
      where: { id: subCategoryId },
    });
    if (!getSubCategory || getSubCategory.length === 0)
      throw new NotFoundException('Subcategory does not exist');
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

  async AdminDeleteTopic(deleteTopic: AdminDeleteTopicDto): Promise<boolean> {
    const { topicId } = deleteTopic;
    const getTopic = await this.prisma.topic.findMany({
      where: {
        id: +topicId,
        isDeleted: true,
      },
    });
    if (!getTopic || getTopic.length === 0)
      throw new NotFoundException('ไม่มีหัวข้อดังกล่าว หรือได้ถูกลบไปแล้ว');
    try {
      await this.prisma.topic.update({
        where: {
          id: +topicId,
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

  async AdminUpdateTopic(updateTopic: AdminUpdateTopicDto): Promise<boolean> {
    const { topicId, topicName } = updateTopic;
    const getTopic = await this.prisma.topic.findMany({
      where: {
        id: +topicId,
        isDeleted: true,
      },
    });
    if (!getTopic || getTopic.length === 0)
      throw new NotFoundException('ไม่มีหัวข้อดังกล่าว หรือได้ถูกลบไปแล้ว');
    try {
      await this.prisma.topic.update({
        where: {
          id: +topicId,
        },
        data: {
          topicName: topicName,
          updatedAt: new Date(),
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
        isAvailable: true,
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

  async AdminGetAllSubCategory(): Promise<SubCategoryModel[]> {
    const getSubCategory = await this.prisma.subCategory.findMany({
      where: {
        isAvailable: true,
      },
    });
    return getSubCategory;
  }

  async AdminGetAllCategory(): Promise<CategoryModel[]> {
    return await this.prisma.category.findMany({
      include: {
        SubCategory: {
          where: {
            isAvailable: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async AdminDeleteSubCategory(
    deleteSubCategoryDto: DeleteSubCategoryDto,
  ): Promise<boolean> {
    const { subCategoryId } = deleteSubCategoryDto;
    try {
      await this.prisma.subCategory.update({
        where: {
          id: subCategoryId,
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

  async AdminUpdateSubCategory(
    adminUpdateSubCategoryDto: AdminUpdateSubCategoryDto,
  ): Promise<boolean> {
    const { id, subCategoryName } = adminUpdateSubCategoryDto;
    try {
      await this.prisma.subCategory.update({
        where: {
          id,
        },
        data: {
          subCategoryName,
          updatedAt: new Date(),
        },
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
