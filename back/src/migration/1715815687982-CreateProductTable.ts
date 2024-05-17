import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1629058192122 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        code VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL NOT NULL,
        quantity INTEGER NOT NULL,
        "inventoryStatus" VARCHAR NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR,
        rating DECIMAL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS products`);
  }
}
