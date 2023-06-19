import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.enableCors({
		allowedHeaders: ['content-type'],
		origin: true
	});

	app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
