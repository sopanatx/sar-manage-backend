import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminCreateUserDto } from './dto/AdminCreateUser.dto';
import { AdminUpdateUserDto } from './dto/AdminUpdateUser.dto';
import { UserModel } from './models/User.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async AdminGetAllUserService(): Promise<UserModel[]> {
    return await this.prisma.account.findMany({
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
}
