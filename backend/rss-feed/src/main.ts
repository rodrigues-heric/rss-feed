import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('RSS Feed')
    .setDescription('Feed RSS aggregator API')
    .setVersion('1.0.0')
    .addCookieAuth('session-id')
    .build();
  const documentSwaggerFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwaggerFactory);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
