import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';

export class MySqlCoreEntity {

    @PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
	}

}
