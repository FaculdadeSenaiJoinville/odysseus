import { CreateDateColumn, UpdateDateColumn, BeforeUpdate, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';

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

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
	}

}
