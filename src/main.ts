import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const morgan = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
