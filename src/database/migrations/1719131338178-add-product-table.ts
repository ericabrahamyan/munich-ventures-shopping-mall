import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductTable1719131338178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the `product` table
    await queryRunner.query(`
      CREATE TABLE public.product (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        title varchar NOT NULL,
        description varchar NOT NULL,
        "SKU" varchar(8) NOT NULL,
        price numeric(10, 2) NOT NULL,
        "categoryId" uuid NOT NULL,
        CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id),
        CONSTRAINT "UQ_aa09ad7a8b1ed8480d481ffd543" UNIQUE ("SKU")
      );
    `);

    // Add foreign key constraint to `categoryId`
    await queryRunner.query(`
      ALTER TABLE public.product 
      ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" 
      FOREIGN KEY ("categoryId") 
      REFERENCES public.category(id) 
      ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the `product` table
    await queryRunner.query(`
      DROP TABLE IF EXISTS public.product;
    `);
  }
}
