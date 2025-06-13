import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Redirect,
	Req,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
	constructor(private readonly urlService: UrlService) {}

	@Get()
	async getAllUrls() {
		return this.urlService.getAllUrls();
	}

	@Get(':shortUrl')
	async getUrlByShortUrl(@Param('shortUrl') shortUrl: string) {
		return this.urlService.getUrlByShortUrl(shortUrl);
	}

	@Post()
	async createUrl(@Body() dto: CreateUrlDto) {
		return this.urlService.create(dto);
	}

	@Patch(':shortUrl')
	async updateUrl(
		@Param('shortUrl') shortUrl: string,
		@Body() dto: UpdateUrlDto,
	) {
		return this.urlService.update(shortUrl, dto);
	}

	@Get('short/:shortUrl')
	@Redirect()
	async getShortUrl(@Param('shortUrl') shortUrl: string, @Req() req) {
		const ip =
			req.ip ||
			req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress;
		const originalUrl = await this.urlService.getShortUrl(shortUrl, ip);
		return { url: originalUrl, statusCode: 302 };
	}

	@Delete(':id')
	async deleteUrl(@Param('id') id: string) {
		return this.urlService.delete(id);
	}
}
