import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Category } from '../../category/entities/category.entity';
import {
  IsString,
  Length,
  IsNotEmpty,
  IsDecimal,
  IsAlphanumeric,
} from 'class-validator';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ unique: true, length: 8 })
  @IsString()
  @IsAlphanumeric()
  @Length(8, 8)
  SKU: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Define decimal with precision and scale
  @IsDecimal()
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
