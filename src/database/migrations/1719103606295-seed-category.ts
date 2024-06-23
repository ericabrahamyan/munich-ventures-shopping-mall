import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategory1719103606295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the `category` table already exists and drop it if necessary
    await queryRunner.query(`
      DROP TABLE IF EXISTS category;
    `);

    // Create the `category` table
    await queryRunner.query(`
      CREATE TABLE public.category (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        title varchar NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id)
      );
    `);

    // Insert initial data into the `category` table
    await queryRunner.query(`
      INSERT INTO category (title, description)
      VALUES 
      ('Electronics', 'Devices and gadgets including phones, laptops, and more'),
      ('Books', 'A collection of different genres and types of books'),
      ('Clothing', 'Men and women apparel including shirts, trousers, and more'),
      ('Home & Kitchen', 'Appliances and utensils for home and kitchen use'),
      ('Sports', 'Sporting goods and fitness equipment');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the `category` table
    await queryRunner.query(`
      DROP TABLE IF EXISTS category;
    `);
  }
}
