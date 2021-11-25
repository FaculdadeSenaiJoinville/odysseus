import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class updateBotIntentTable1637369363203 implements MigrationInterface {

	private column = new TableColumn({
		name: 'message',
		type: 'varchar',
		length: '255',
		isNullable: true
	});

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.addColumn('bot_intents', this.column);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropColumn('bot_intents', this.column);
	}

}
