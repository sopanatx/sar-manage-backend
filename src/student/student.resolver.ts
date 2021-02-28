import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { CurrentUser } from 'src/decorators/getUser';
import { getCalendarModel } from 'src/models/student/getCalendar.model';
import { getNewsModel } from 'src/models/student/getNews.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticationError } from 'apollo-server';
import { GetUser } from 'src/shared/decorators/decorators';
import { json } from 'express';

@Resolver()
export class StudentResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [getCalendarModel])
  async getAllCalendar(): Promise<getCalendarModel[]> {
    const getCalendar = await this.prisma.activityCalendar.findMany();
    return getCalendar;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [getNewsModel])
  async getAllNews(): Promise<getNewsModel[]> {
    return await this.prisma.news.findMany();
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  async getStudentGrade(
    @Args('studentId') studentId: string,
    @GetUser() user,
  ): Promise<any> {
    //return user;
    console.log(user);
    return user.username;
  }
}
