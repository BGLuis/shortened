import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { ViewEntity } from './view.entity';

@Entity()
export class UrlEntity {
	@ObjectIdColumn()
	id: ObjectId;

	@Column()
	originalUrl: string;

	@Column()
	shortUrl: string;

	@Column()
	views: ViewEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ nullable: true })
	expiresAt: Date;
}
