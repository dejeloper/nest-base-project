import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {Response} from 'express';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
