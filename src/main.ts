import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {Response} from 'express';

import {AppModule} from '@/app.module';
import {ResponseInterceptor} from '@/shared/interceptors/response.interceptor';
import {HttpErrorFilter} from '@/shared/filters/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.getHttpAdapter().get('/', (req, res: Response) => {
    res.redirect('/api');
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
