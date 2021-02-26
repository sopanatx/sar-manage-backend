import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.enableCors();
  await app.listen(process.env.PORT || 7001);
}
bootstrap();
