import {
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  Length,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsAlphanumeric()
  @Length(8, 8)
  SKU: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: UUID;
}
