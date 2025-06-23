import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 60 })
  name: string;
  @Column({ unique: true })
  cpf: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true, unique: true })
  email: string;
  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];
}
