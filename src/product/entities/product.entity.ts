import { Category } from 'src/category/entities/category.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  productName: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  price: number;
  @Column()
  amount: number;
  @Column({ type: 'date' })
  expirationDate: Date;
  @Column()
  barCode: string;
  @Column({ type: 'date' })
  manufacturingDate: Date;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;
  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn()
  supplier: Supplier;
}
