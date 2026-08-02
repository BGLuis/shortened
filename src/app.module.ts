import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
	imports: [
		UrlModule,
		DatabaseModule,
		AnalyticsModule,
		EventEmitterModule.forRoot(),
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async () => ({
				store: await redisStore({
					socket: {
						host: process.env.REDIS_HOST || 'localhost',
						port: parseInt(process.env.REDIS_PORT) || 6379,
					},
				}),
			}),
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100, // Máximo de 100 requisições por minuto (Token Bucket)
			},
		]),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
