import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entity/url.entity';
import { Repository } from 'typeorm';
import { UpdateUrlDto } from './dto/update-url.dto';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { ViewEntity } from './entity/view.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class UrlService {
	constructor(
		@InjectRepository(UrlEntity)
		private readonly urlRepository: Repository<UrlEntity>,
		@InjectRepository(ViewEntity)
		private readonly viewRepository: Repository<ViewEntity>,
		private readonly eventEmitter: EventEmitter2,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		@Inject('ANALYTICS_SERVICE') private analyticsClient: ClientProxy,
	) {}

	private kgsCounter = 1000000; // Simulação de um KGS Counter

	async generateShortCode(length = 6) {
		// Fase 2: Conversão matemática Base62 de um ID sequencial (KGS simulado)
		this.kgsCounter++;
		let num = this.kgsCounter;

		const chars =
			'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		while (num > 0) {
			result = chars[num % 62] + result;
			num = Math.floor(num / 62);
		}

		while (result.length < length) {
			result = chars[0] + result;
		}

		return result;
	}

	async create(dto: CreateUrlDto) {
		if (dto.customShortUrl) {
			const findshort = await this.urlRepository.findOne({
				where: { shortUrl: dto.customShortUrl },
			});
			if (findshort)
				throw new BadRequestException(
					'Custom short URL already exists',
				);
		}

		const shortUrl = dto.customShortUrl || (await this.generateShortCode());

		const url = this.urlRepository.create({
			...dto,
			originalUrl: dto.url,
			shortUrl,
		});

		return this.urlRepository.save(url);
	}

	async getShortUrl(shortUrl: string, ip?: string) {
		// Fase 3: Cache-Aside com Redis
		const cachedOriginalUrl = await this.cacheManager.get<string>(shortUrl);
		let originalUrl = cachedOriginalUrl;

		if (!originalUrl) {
			const url = await this.urlRepository.findOne({
				where: { shortUrl },
			});
			if (!url) {
				throw new BadRequestException('Short URL not found');
			}
			originalUrl = url.originalUrl;
			// Salva no cache com TTL (e.g. 1 hora = 3600000ms)
			await this.cacheManager.set(shortUrl, originalUrl, 3600000);
		}

		// Fase 4: Envio para Fila RabbitMQ (Analytics Assíncrono)
		this.analyticsClient.emit('url.clicked', {
			urlId: shortUrl,
			ip,
			timestamp: new Date(),
		});

		// Mantido evento local para compatibilidade enquanto worker não existe
		this.eventEmitter.emit('url.accessed', shortUrl, ip);

		return originalUrl;
	}
	async update(id: string, dto: UpdateUrlDto) {
		const url = await this.urlRepository.findOne({
			where: { id: new ObjectId(id) },
		});
		if (!url) {
			throw new BadRequestException('URL not found');
		}
		if (dto.customShortUrl) {
			const findshort = await this.urlRepository.findOne({
				where: { shortUrl: dto.customShortUrl },
			});
			if (findshort && findshort.id.toString() !== id)
				throw new BadRequestException(
					'Custom short URL already exists',
				);
			url.shortUrl = dto.customShortUrl;
		}

		this.urlRepository.merge(url, dto);
		return this.urlRepository.save(url);
	}
	async delete(id: string) {
		const url = await this.urlRepository.findOne({
			where: { id: new ObjectId(id) },
		});
		if (!url) {
			throw new BadRequestException('URL not found');
		}
		await this.urlRepository.remove(url);
		return { message: 'URL deleted successfully' };
	}

	async getAllUrls() {
		return this.urlRepository.find();
	}
	async getUrlByShortUrl(shortUrl: string) {
		const url = await this.urlRepository.findOne({
			where: { shortUrl },
		});
		if (!url) {
			throw new BadRequestException('URL not found');
		}

		const views = await this.viewRepository.find({
			where: { urlId: url.id.toString() },
		});

		const newUrl = {
			...url,
			views: views.length || 0,
			viewsUniqui: views.reduce((acc, view) => {
				if (!acc.includes(view.ip)) {
					acc.push(view.ip);
				}
				return acc;
			}, [] as string[]).length,
		};
		return newUrl;
	}

	@OnEvent('url.accessed')
	async handleUrlAccessed(shortUrl: string, ip?: string) {
		const url = await this.urlRepository.findOne({
			where: { shortUrl },
		});
		if (url) {
			const view = this.viewRepository.create({
				urlId: url.id.toString(),
				ip,
				createdAt: new Date(),
			});
			await this.viewRepository.save(view);
		}
	}
}
