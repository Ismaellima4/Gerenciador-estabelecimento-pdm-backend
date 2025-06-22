import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column('simple-array', { unique: false })
  contacts: string[];

  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];
}

