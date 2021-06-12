import { CreateDateColumn, UpdateDateColumn, BeforeUpdate, ObjectIdColumn, ObjectID, Column } from 'typeorm';

export class MongoCoreEntity {

    @ObjectIdColumn()
	_id: ObjectID;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column()
	created_by: string;

	@Column()
	updated_by: string;

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
	}

}