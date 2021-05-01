import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from 'nestjs-throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {}
