import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
	@IsUrl()
	url: string;

	@IsDateString()
	@IsOptional()
	expiresAt?: Date;

	@IsString()
	@IsOptional()
	customShortUrl?: string;
}
