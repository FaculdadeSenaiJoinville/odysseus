import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1612143421629 implements MigrationInterface {

    private table = new Table({
    	name: 'users',
    	columns: [
    		{
    			name: 'id',
    			type: 'varchar',
    			length: '64',
    			isPrimary: true,
    			isGenerated: true,
    			generationStrategy: 'uuid',
    		},
    		{
    			name: 'name',
    			type: 'varchar',
    			length: '100',
    			isNullable: false,
    		},
    		{
    			name: 'email',
    			type: 'varchar',
    			length: '255',
    			isUnique: true,
    			isNullable: false,
    		},
    		{
    			name: 'password',
    			type: 'varchar',
    			length: '255',
    			isNullable: false,
    		},
    		{
    			name: 'active',
    			type: 'boolean',
    			isNullable: false,
    			default: true
    		},
    		{
    			name: 'created_at',
    			type: 'timestamp',
    			isNullable: false,
    			default: 'NOW()',
    		},
    		{
    			name: 'updated_at',
    			type: 'timestamp',
    			isNullable: false,
    			default: 'NOW()',
    		},
    		{
    			name: 'created_by',
    			type: 'varchar',
    			length: '64',
    		},
    		{
    			name: 'updated_by',
    			type: 'varchar',
    			length: '64',
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
