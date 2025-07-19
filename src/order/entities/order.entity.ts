// src/order/entities/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { OrderStatus } from 'src/enum/order-status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: ['insert', 'remove', 'update'],
    eager: true,
  })
  orderItems: OrderItem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.INITIATED })
  status: OrderStatus;

  @OneToOne(() => Payment, (payment) => payment.order, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  payment: Payment;
}
