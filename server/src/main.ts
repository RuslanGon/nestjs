import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;

  // 
  app.enableCors({
    origin: 'http://localhost:5173', 
    credentials: true,
  });

  await app.listen(port);
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  console.log('✅ Подключение к MySQL установлено');
}
bootstrap();
