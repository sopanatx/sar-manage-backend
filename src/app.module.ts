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

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      debug: eval(process.env.IS_DEBUG) || false,
      playground: eval(process.env.IS_DEBUG) || false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,

      context: ({ req, res, connection }) => ({ req, res, connection }),
      introspection: true,
      cors: false,
    }),

    AuthModule,
    UserModule,
    PassportModule,
    DocumentsModule,
  ],
  providers: [AppService, AppResolver, PrismaService],
})
export class AppModule {}
