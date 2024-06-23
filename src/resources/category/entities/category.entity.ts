import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Product } from '../../product/entities/product.entity';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
