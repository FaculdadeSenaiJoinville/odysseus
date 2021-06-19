import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Index, BeforeInsert } from 'typeorm';

export class MySqlCoreEntity {

    @PrimaryGeneratedColumn('uuid')
	@Index()
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

	@BeforeInsert()
	protected setInsertProperties() {

		this.created_by = this.id;
	}

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
	}

}
