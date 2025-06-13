import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ViewEntity } from './view.entity';

@Entity()
export class UrlEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 2048, unique: true })
	@Index()
	shortUrl: string;

	@Column({ length: 2048 })
	@Index()
	originalUrl: string;

	@OneToMany(() => ViewEntity, (view) => view.url, { cascade: true })
	views: ViewEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ nullable: true })
	expiresAt: Date;
}
