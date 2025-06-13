import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
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

	@Get(':id')
	async getUrlById(@Param('id') id: string) {
		return this.urlService.getUrlById(id);
	}

	@Post()
	async createUrl(@Body() dto: CreateUrlDto) {
		return this.urlService.create(dto);
	}

	@Patch(':id')
	async updateUrl(@Param('id') id: string, @Body() dto: UpdateUrlDto) {
		return this.urlService.update(id, dto);
	}

	@Get('short/:shortUrl')
	async getShortUrl(@Param('shortUrl') shortUrl: string) {
		return this.urlService.getShortUrl(shortUrl);
	}

	@Delete(':id')
	async deleteUrl(@Param('id') id: string) {
		return this.urlService.delete(id);
	}
}
