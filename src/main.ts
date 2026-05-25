import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const morgan = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
