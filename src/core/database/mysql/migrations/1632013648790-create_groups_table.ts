import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createGroupsTable1632013648790 implements MigrationInterface {

	private table = new Table({
		name: 'groups',
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
				name: 'name',
				type: 'varchar',
				length: '100',
				isNullable: false
			},
			{
				name: 'description',
				type: 'longtext'
			},
			{
				name: 'created_at',
				type: 'timestamp',
				isNullable: false,
				default: 'NOW()'
			},
			{
				name: 'updated_at',
				type: 'timestamp',
				isNullable: false,
				default: 'NOW()'
			},
			{
				name: 'created_by',
				type: 'varchar',
				length: '64'
			},
			{
				name: 'updated_by',
				type: 'varchar',
				length: '64'
			}
		]
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

		await queryRunner.createTable(this.table, true);
		await queryRunner.createForeignKeys(this.table, this.foreinKeys);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropTable(this.table, true);
		await queryRunner.dropForeignKeys(this.table, this.foreinKeys);
	}

}
