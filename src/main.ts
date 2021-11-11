import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {setupSwagger} from './swagger';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './httpException.filter';
import {TransformInterceptor} from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  setupSwagger(app);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
