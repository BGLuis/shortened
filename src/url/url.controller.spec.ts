import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

describe('UrlController', () => {
	let controller: UrlController;

	const mockUrlService = {
		create: jest.fn(),
		getShortUrl: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UrlController],
			providers: [
				{ provide: UrlService, useValue: mockUrlService },
			],
		}).compile();

		controller = module.get<UrlController>(UrlController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
