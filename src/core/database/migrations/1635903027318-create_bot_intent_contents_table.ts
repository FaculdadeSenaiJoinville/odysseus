import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createBotIntentContentsTable1635903027318 implements MigrationInterface {

    private table = new Table({
    	name: 'bot_intent_contents',
    	columns: [
    		{
    			name: 'intent_id',
    			type: 'varchar',
    			length: '64',
    			isNullable: false

    		},
    		{
    			name: 'content_id',
    			type: 'varchar',
    			length: '64',
    			isNullable: false
    		},
    		{
    			name: 'added_at',
    			type: 'timestamp',
    			isNullable: false,
    			default: 'NOW()'
    		}
    	]
    });

	private foreinKeys = [
		new TableForeignKey({
			columnNames: ['intent_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'bot_intents',
			onDelete: 'CASCADE'
		}),
		new TableForeignKey({
			columnNames: ['content_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'bot_contents',
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
