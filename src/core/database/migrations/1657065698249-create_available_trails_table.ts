import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAvailableTrailsTable1657065698249 implements MigrationInterface {

	private table = new Table({
		name: 'available_trails',
		columns: [
			{
				name: 'trail_id',
				type: 'varchar',
				length: '64',
				isNullable: false

			},
			{
				name: 'user_id',
				type: 'varchar',
				length: '64',
				isNullable: false
			},
			{
				name: 'added_by',
				type: 'varchar',
				length: '64',
				isNullable: false
			},
			{
				name: 'released_at',
				type: 'timestamp',
				isNullable: false,
				default: 'NOW()'
			}
		]
	});

	private foreinKeys = [
		new TableForeignKey({
			columnNames: ['trail_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'trails',
			onDelete: 'CASCADE'
		}),
		new TableForeignKey({
			columnNames: ['user_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users',
			onDelete: 'CASCADE'
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
