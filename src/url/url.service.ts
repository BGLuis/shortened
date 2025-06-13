import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entity/url.entity';
import { Repository } from 'typeorm';
import { UpdateUrlDto } from './dto/update-url.dto';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { ViewEntity } from './entity/view.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UrlService {
	constructor(
		@InjectRepository(UrlEntity)
		private readonly urlRepository: Repository<UrlEntity>,
		@InjectRepository(ViewEntity)
		private readonly viewRepository: Repository<ViewEntity>,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async generateShortCode(length = 6) {
		const chars =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		const findshort = await this.urlRepository.findOne({
			where: { shortUrl: result },
		});
		if (findshort) {
			return this.generateShortCode(length);
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
		const url = await this.urlRepository.findOne({
			where: { shortUrl },
		});
		if (!url) {
			throw new BadRequestException('Short URL not found');
		}

		this.eventEmitter.emit('url.accessed', url, ip);
		return url.originalUrl;
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
		delete url.views;
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
		const newUrl = {
			...url,
			views: url.views.length || 0,
			viewsUniqui: url.views.reduce((acc, view) => {
				if (!acc.includes(view.ip)) {
					acc.push(view.ip);
				}
				return acc;
			}, [] as string[]).length,
		};
		return newUrl;
	}

	@OnEvent('url.accessed')
	async handleUrlAccessed(url: UrlEntity, ip?: string) {
		url.views = url.views || [];
		url.views.push(
			this.viewRepository.create({
				ip,
				createdAt: new Date(),
			}),
		);
		await this.urlRepository.save(url);
	}
}
