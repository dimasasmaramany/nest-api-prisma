import 'dotenv/config'; // Tambahkan ini di baris paling ATAS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { formatValidationErrors } from './common/helpers/validation.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: formatValidationErrors,
    }),
  );

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
