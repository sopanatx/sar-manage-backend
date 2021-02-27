import { Query, Resolver } from '@nestjs/graphql';
import { getCalendarModel } from 'src/models/student/getCalendar.model';
import { getNewsModel } from 'src/models/student/getNews.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class StudentResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [getCalendarModel])
  async getCalendar(): Promise<getCalendarModel[]> {
    const getCalendar = await this.prisma.activityCalendar.findMany();
    return getCalendar;
  }

  @Query(() => [getNewsModel])
  async getAllNews(): Promise<getNewsModel[]> {
    return await this.prisma.news.findMany();
  }
}
