import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from 'src/app-config/app-config.service';

export const config = (
	configService: AppConfigService,
): TypeOrmModuleOptions => ({
	type: 'mongodb',
	database: ':memory:',
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],
	synchronize: true,
});
