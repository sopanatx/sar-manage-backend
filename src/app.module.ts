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
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { RolesGuard } from './auth/strategy/roles.guard';
import { NestMinioModule } from 'nestjs-minio';
import { UploadController } from './upload/upload.controller';
import { AdminResolver } from './admin/admin.resolver';
import { AdminService } from './admin/admin.service';

const isDevelopmentEnv = process.env.ENV == 'development' ? true : false;
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      debug: isDevelopmentEnv,
      playground: isDevelopmentEnv,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      introspection: isDevelopmentEnv,
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
    AdminResolver,
    AdminService,
    //    FileUpload,
  ],
  controllers: [UploadController],
})
export class AppModule {}
