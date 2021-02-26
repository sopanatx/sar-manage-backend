import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as fs from 'fs';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 7001);
  Logger.log('Application Listening on HTTP');
}
async function bootstraps() {
  let httpsOptions = null;
  if (process.env.SSL) {
    httpsOptions = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERT),
    };
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    httpsOptions,
  });
  app.use(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 7001);
  Logger.log('Application Listening on HTTPS');
}
if (process.env.SSL == 'true') {
  bootstraps();
} else {
  bootstrap();
}
