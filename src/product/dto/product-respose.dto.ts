import { Product } from '../entities/product.entity';

export class ProductResposeDTO {
  id: string;
  productName: string;
  description?: string;
  price: number;
  category: string;
  amount: number;
  expirationDate: Date;
  barCode?: string;
  manufacturingDate: Date;
  supplier: string;

  constructor(product: Product) {
    this.id = product.id;
    this.productName = product.productName;
    this.description = product.barCode;
    this.price = product.price;
    this.category = product.category.name;
    this.amount = product.amount;
    this.expirationDate = product.expirationDate;
    this.barCode = product.barCode;
    this.manufacturingDate = product.manufacturingDate;
    this.supplier = product.supplier;
  }
}
