import { NotFoundException } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { getAllUserModel } from 'src/models/getAllUser.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class AuthResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [getAllUserModel])
  async getAllUser(): Promise<getAllUserModel[]> {
    const getUser = await this.prisma.account.findMany();
    console.log(getUser);
    if (!getUser) throw new NotFoundException();
    return getUser;
  }
}
