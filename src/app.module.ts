import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app/app.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      debug: eval(process.env.IS_DEBUG) ?? false,
      playground: eval(process.env.IS_DEBUG) ?? false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res, connection }) => ({ req, res, connection }),
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
