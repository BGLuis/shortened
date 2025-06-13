import { CreateDateColumn } from 'typeorm';
import { UrlEntity } from './url.entity';

export class ViewEntity {
	@CreateDateColumn()
	createdAt: Date;
	url: UrlEntity;
}
