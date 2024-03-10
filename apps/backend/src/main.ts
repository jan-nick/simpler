/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { PrismaService } from './app/core/prisma/prisma.service';
import { environment } from '@simpler-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const prismaService = app.get(PrismaService);
  const port = process.env.PORT || 3333;

  await prismaService.enableShutdownHooks(app);
  app.enableCors({
    origin: environment.frontendUrl,
  });
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
