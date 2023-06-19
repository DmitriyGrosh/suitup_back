import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			'http://localhost:3000',
			'http://194.67.110.39/',
			'http://suit-up.ru/'
		]
	});

	app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
