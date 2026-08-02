import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class ViewEntity {
	@ObjectIdColumn()
	id: ObjectId;

	@Column()
	urlId: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column()
	ip: string;
}
