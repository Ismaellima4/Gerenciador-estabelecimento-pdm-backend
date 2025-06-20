import { Product } from 'src/product/entities/product.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  name: string;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
