import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDatabaseDbSchool1616021289276 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createDatabase('db_school', true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropDatabase('db_school', true);
	}

}
