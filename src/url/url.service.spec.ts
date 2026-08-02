import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UrlEntity } from './entity/url.entity';
import { ViewEntity } from './entity/view.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('UrlService', () => {
	let service: UrlService;

	const mockUrlRepository = {
		findOne: jest.fn(),
		create: jest.fn(),
		save: jest.fn(),
	};
	const mockViewRepository = {
		create: jest.fn(),
		save: jest.fn(),
	};
	const mockEventEmitter = {
		emit: jest.fn(),
	};
	const mockCacheManager = {
		get: jest.fn(),
		set: jest.fn(),
	};
	const mockAnalyticsClient = {
		emit: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UrlService,
				{
					provide: getRepositoryToken(UrlEntity),
					useValue: mockUrlRepository,
				},
				{
					provide: getRepositoryToken(ViewEntity),
					useValue: mockViewRepository,
				},
				{ provide: EventEmitter2, useValue: mockEventEmitter },
				{ provide: CACHE_MANAGER, useValue: mockCacheManager },
				{ provide: 'ANALYTICS_SERVICE', useValue: mockAnalyticsClient },
			],
		}).compile();

		service = module.get<UrlService>(UrlService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should generate a base62 shortcode', async () => {
		const code = await service.generateShortCode();
		expect(code).toBeDefined();
		expect(typeof code).toBe('string');
	});
});
