import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';

export class MySqlCoreEntity {

    @PrimaryGeneratedColumn()
	id: string;

	@Column({ length: 100 })
	name: string;

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
