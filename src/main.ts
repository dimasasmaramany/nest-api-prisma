import 'dotenv/config'; // Tambahkan ini di baris paling ATAS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { formatValidationErrors } from './common/helpers/validation.helper';
import { PrismaExceptionFilter } from './common/helpers/prisma-error.handler';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new PrismaExceptionFilter());

  // 🔥 Serve static files from 'uploads' folder
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Tambahkan ini agar bisa convert string ke number otomatis (penting buat form-data)
      exceptionFactory: formatValidationErrors,
    }),
  );

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
