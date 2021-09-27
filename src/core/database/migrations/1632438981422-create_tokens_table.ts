import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createTokenTable1632438981422 implements MigrationInterface {

	private table = new Table({
		name: 'tokens',
		columns: [
			{
				name: 'id',
				type: 'varchar',
				length: '64',
				isPrimary: true,
				isGenerated: true,
				generationStrategy: 'uuid'
			},
			{
				name: 'token',
				type: 'varchar',
				length: '255',
				isNullable: false
			},
			{
				name: 'user_id',
				type: 'varchar',
				length: '64',
				isNullable: true
			}
		]
	});

	private foreinKey = new TableForeignKey({
		columnNames: ['user_id'],
		referencedColumnNames: ['id'],
		referencedTableName: 'users'
	});

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createTable(this.table, true);
		await queryRunner.createForeignKey(this.table, this.foreinKey);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropTable(this.table, true);
		await queryRunner.dropForeignKey(this.table, this.foreinKey);
	}

}
