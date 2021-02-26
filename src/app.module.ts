import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app/app.service';
import { AppResolver } from './app/app.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      debug: eval(process.env.IS_DEBUG) || false,
      playground: eval(process.env.IS_DEBUG) || false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res, connection }) => ({ req, res, connection }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 15060,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
    }),
    AuthModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
