import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class UrlEntity {
	@ObjectIdColumn()
	id: ObjectId;

	@Column()
	originalUrl: string;

	@Column()
	shortUrl: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ nullable: true })
	expiresAt: Date;
}
