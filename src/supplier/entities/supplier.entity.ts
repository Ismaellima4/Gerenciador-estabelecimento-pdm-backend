import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  supplierName: string;
  @Column({ nullable: true, unique: true })
  cnpj: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true, unique: true })
  email: string;
  @Column({ nullable: true })
  additionalInformation: string;
  @OneToMany(() => Product, (product) => product.supplier)
  @JoinColumn()
  products: Product[];
}
