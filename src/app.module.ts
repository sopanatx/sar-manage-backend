import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app/app.service';
import { AppResolver } from './app/app.resolver';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DocumentsModule } from './documents/documents.module';
import { ThrottlerGuard, ThrottlerModule } from 'nestjs-throttler';
import { APP_GUARD } from '@nestjs/core';
import {
  ApplicationType,
  GoogleRecaptchaModule,
  GoogleRecaptchaNetwork,
} from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';
import { CategoryModule } from './category/category.module';
import { RolesGuard } from './auth/strategy/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      debug: eval(process.env.IS_DEBUG) || false,
      playground: eval(process.env.IS_DEBUG) || false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      introspection: eval(process.env.INTROSPECTION) || false,
      cors: false,
    }),
    AuthModule,
    UserModule,
    PassportModule,
    DocumentsModule,
    CategoryModule,
  ],
  providers: [
    AppService,
    AppResolver,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
