import { session } from 'src/core/session';
import { CreateDateColumn, UpdateDateColumn, BeforeUpdate, ObjectIdColumn, ObjectID, Column, Index, BeforeInsert } from 'typeorm';

export class MongoCoreEntity {

    @ObjectIdColumn()
	@Index()
	public _id: ObjectID;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

	@Column()
	public created_by: string;

	@Column()
	public updated_by: string;

	@BeforeInsert()
	protected setInsertProperties() {

		this.created_by = session.getUser().id;
		this.updated_by = session.getUser().id;
	}

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
		this.updated_by = session.getUser().id;
	}

}
