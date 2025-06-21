import { CategoryResponseDTO } from 'src/category/dto/category-response.dto';
import { Product } from '../entities/product.entity';
import { SupplierResposeDTO } from 'src/supplier/dto/supplier-response.dto';

export class ProductResposeDTO {
  id: string;
  productName: string;
  description?: string;
  price: number;
  category: CategoryResponseDTO;
  amount: number;
  expirationDate: Date;
  barCode?: string;
  manufacturingDate: Date;
  supplier: SupplierResposeDTO;

  constructor(product: Product) {
    this.id = product.id;
    this.productName = product.productName;
    this.description = product.barCode;
    this.price = product.price;
    this.category = new CategoryResponseDTO(product.category);
    this.amount = product.amount;
    this.expirationDate = product.expirationDate;
    this.barCode = product.barCode;
    this.manufacturingDate = product.manufacturingDate;
    this.supplier = new SupplierResposeDTO(product.supplier);
  }
}
