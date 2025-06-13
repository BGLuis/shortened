import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entity/url.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UrlEntity])],
	controllers: [UrlController],
	providers: [UrlService],
})
export class UrlModule {}
