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
}
