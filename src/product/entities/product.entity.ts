import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  @Column()
  amount: number;
  @Column({ type: 'date' })
  expirationDate: Date;
  @Column()
  barCode: string;
  @Column({ type: 'date' })
  manufacturingDate: Date;
  @Column()
  supplier: string;
}
