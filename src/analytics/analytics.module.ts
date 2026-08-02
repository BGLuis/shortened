import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewEntity } from '../url/entity/view.entity';
import { AnalyticsController } from './analytics.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ViewEntity])],
	controllers: [AnalyticsController],
})
export class AnalyticsModule {}
