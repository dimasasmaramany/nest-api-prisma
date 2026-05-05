import 'dotenv/config'; // Tambahkan ini di baris paling ATAS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
