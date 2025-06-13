import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entity/url.entity';
import { ViewEntity } from './entity/view.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UrlEntity, ViewEntity])],
	controllers: [UrlController],
	providers: [UrlService],
})
export class UrlModule {}
