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
import { FileUpload } from './scalars/upload.scalar';
import { UploadController } from './upload/upload.controller';
const isDevelopmentEnv = process.env.ENV == 'development' ?? (true || false);
console.log({ isDevelopmentEnv });
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
    //    FileUpload,
  ],
  controllers: [UploadController],
})
export class AppModule {}
