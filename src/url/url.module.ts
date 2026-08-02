import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entity/url.entity';
import { ViewEntity } from './entity/view.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		TypeOrmModule.forFeature([UrlEntity, ViewEntity]),
		ClientsModule.register([
			{
				name: 'ANALYTICS_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
					queue: 'analytics_queue',
					queueOptions: {
						durable: true,
					},
				},
			},
		]),
	],
	controllers: [UrlController],
	providers: [UrlService],
})
export class UrlModule {}
