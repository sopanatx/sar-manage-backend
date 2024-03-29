import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { RolesGuard } from './auth/strategy/roles.guard';
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());

  // app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
    }),
  );
  app.use(compression());
  app.enableCors();
  await app.listen(process.env.PORT || 7001);
}
bootstrap();
