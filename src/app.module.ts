import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
	imports: [UrlModule, DatabaseModule, EventEmitterModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
