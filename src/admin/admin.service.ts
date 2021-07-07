import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminUpdateUserDto } from './dto/AdminUpdateUser.dto';
import { UserModel } from './models/User.model';

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
}
