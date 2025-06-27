import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryErrorFilter } from './common/query-filter-.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryErrorFilter());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
