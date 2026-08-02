import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.set('trust proxy', 1); // Confia no X-Forwarded-For (necessário para o Throttler identificar IPs por trás do proxy/k6)

	configPipe(app);

	// Configuração do Worker Híbrido (RabbitMQ Consumer)
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
			queue: 'analytics_queue',
			queueOptions: {
				durable: true, // Garante que a fila sobreviva a restarts
			},
		},
	});

	await app.startAllMicroservices(); // Inicia o worker
	await app.listen(3000); // Inicia a API HTTP
}

function configPipe(app: INestApplication) {
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);
}

bootstrap();
