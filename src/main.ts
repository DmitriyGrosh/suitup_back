import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	const whitelist = ['http://localhost:3000/', 'http://194.67.110.39/', 'http://suit-up.ru', 'http://suit-up.ru/', 'http://www.suit-up.ru'];
	app.enableCors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				console.log("allowed cors for:", origin)
				callback(null, true)
			} else {
				console.log("blocked cors for:", origin)
				callback(new Error('Not allowed by CORS'))
			}
		},
		allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
		methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
		credentials: true,
	});
	// app.enableCors({
	// 	allowedHeaders: 'Access-Control-Allow-Origin',
	// 	credentials: true,
	// 	origin: [
	// 		'http://localhost:3000/',
	// 		'http://194.67.110.39/',
	// 		'http://suit-up.ru'
	// 	]
	// });

	app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
