import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port =  process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server running on  port ${port}`, 'Bootstrap');
}
bootstrap();
