import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createBotHistories1637541386513 implements MigrationInterface {
	
	private table = new Table({
  	name: 'bot_histories',
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
  			name: 'user_name',
  			type: 'varchar',
  			length: '100',
  			isNullable: false
  		},
  		{
  			name: 'user_message',
  			type: 'longtext'
  		},
  		{
  			name: 'bot_response',
  			type: 'json'
  		},
  		{
  			name: 'chat_id',
  			type: 'int'
  		},
  		{
  			name: 'created_at',
  			type: 'timestamp',
  			isNullable: false,
  			default: 'NOW()'
  		}
  	]
	});

	public async up(queryRunner: QueryRunner): Promise<void> {

  	await queryRunner.createTable(this.table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

  	await queryRunner.dropTable(this.table, true);
	}
}