import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  expirationDate: Date;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  barCode?: string;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  manufacturingDate: Date;
  @IsString()
  @IsNotEmpty()
  supplier: string;
}
