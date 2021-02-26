import { NotFoundException } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { getAllUserModel } from 'src/models/getAllUser.model';

@Resolver()
export class AuthResolver {}
