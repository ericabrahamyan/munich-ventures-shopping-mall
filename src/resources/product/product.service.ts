import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { UUID } from 'crypto';
import { isUUID } from 'class-validator';
import { omit } from 'lodash';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, SKU, price, categoryId } = createProductDto;

    // Check for duplicate SKU
    const existingProduct = await this.productRepository.findOne({
      where: { SKU },
    });
    if (existingProduct) {
      throw new ConflictException(`Product with SKU ${SKU} already exists`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const product = this.productRepository.create({
      title,
      description,
      SKU,
      price,
      category,
    });

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: UUID): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: UUID, updateProductDto: UpdateProductDto): Promise<Product> {
    const { SKU, categoryId } = updateProductDto;
    this.validateUUID(id);

    updateProductDto = omit(updateProductDto, ['id', 'createdAt', 'updatedAt']);

    // Check if the product to update exists
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Check for duplicate SKU
    if (SKU) {
      const existingProduct = await this.productRepository.findOne({
        where: { SKU },
      });
      if (existingProduct && existingProduct.id !== id) {
        throw new ConflictException(`Product with SKU ${SKU} already exists`);
      }
    }

    // Check if the new category exists
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      product.category = category;
    }

    return this.productRepository.save(product);
  }

  async remove(id: UUID): Promise<void> {
    this.validateUUID(id);
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  private validateUUID(id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }
  }
}
