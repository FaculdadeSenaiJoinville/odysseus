import { session } from 'src/core/session';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Index, BeforeInsert } from 'typeorm';

export class CoreEntity {

    @PrimaryGeneratedColumn('uuid')
	@Index()
	public id: string;

	@Column({ length: 100 })
	public name: string;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

	@Column()
	public created_by?: string;

	@Column()
	public updated_by?: string;

	@BeforeInsert()
	protected setInsertProperties() {

		this.created_by = session.getUser()?.id;
		this.updated_by = session.getUser()?.id;
	}

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
		this.updated_by = session.getUser().id;
	}

}
