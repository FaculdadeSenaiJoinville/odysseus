import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class updateUsersTable1632013706363 implements MigrationInterface {

	private column = new TableColumn({
		name: 'is_new',
		type: 'boolean',
		isNullable: false,
		default: true
	});

	private foreinKeys = [
		new TableForeignKey({
			columnNames: ['created_by'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users'
		}),
		new TableForeignKey({
			columnNames: ['updated_by'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users'
		})
	];

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.addColumn('users', this.column);
		await queryRunner.createForeignKeys('users', this.foreinKeys);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropColumn('users', this.column);
		await queryRunner.dropForeignKeys('users', this.foreinKeys);
	}

}
