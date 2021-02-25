import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app/app.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res, connection }) => ({ req, res, connection }),
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
