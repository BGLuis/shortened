import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewEntity } from '../url/entity/view.entity';

@Controller()
export class AnalyticsController {
	private readonly logger = new Logger(AnalyticsController.name);

	constructor(
		@InjectRepository(ViewEntity)
		private readonly viewRepository: Repository<ViewEntity>,
	) {}

	@EventPattern('url_clicked')
	async handleUrlClicked(
		@Payload()
		data: {
			shortUrl: string;
			userAgent: string;
			ip: string;
			timestamp: string;
		},
	) {
		try {
			const view = this.viewRepository.create({
				urlId: data.shortUrl,
				ip: data.ip,
				createdAt: new Date(data.timestamp),
			});
			await this.viewRepository.save(view);
			// Descomentar para debug detalhado
			// this.logger.log(`[Analytics] Clique salvo p/ ${data.shortUrl} do IP ${data.ip}`);
		} catch (error) {
			this.logger.error(
				`Erro ao registrar clique via RabbitMQ: ${error.message}`,
			);
		}
	}
}
