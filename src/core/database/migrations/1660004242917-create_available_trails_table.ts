import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAvailableTrailsTable1660004242917 implements MigrationInterface {

	private table = new Table({
		name: 'available_trails',
		columns: [
			{
				
				name: 'id',
				type: 'varchar',
				length: '64',
				isGenerated: true,
				isUnique: true,
				generationStrategy: 'uuid'           

			},
			{
				name: 'trails_id',
				type: 'varchar',
				length: '64',
        isPrimary: true,
				isNullable: false
			},
			{
				name: 'entity_id',
				type: 'varchar',
				length: '64',
				isPrimary: true,
				isNullable: false
			},
			{
				name: 'type',
				type: 'varchar',
				length: '64',
				isNullable: false
			},
			{
				name: 'created_by',
				type: 'varchar',
				length: '64'
			}
		]
	});

	private foreinKeys = [
		new TableForeignKey({
			columnNames: ['trails_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'trails',
			onDelete: 'CASCADE'
		}),
        new TableForeignKey({
			columnNames: ['created_by'],
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
