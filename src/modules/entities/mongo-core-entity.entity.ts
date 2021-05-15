import { CreateDateColumn, UpdateDateColumn, BeforeUpdate, ObjectIdColumn, ObjectID } from 'typeorm';

export class MongoCoreEntity {

    @ObjectIdColumn()
	_id: ObjectID;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
	}

}
