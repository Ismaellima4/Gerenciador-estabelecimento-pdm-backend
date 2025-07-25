import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { PaymentType } from 'src/enum/payment-type.enum';
import { PaymentStatus } from 'src/enum/payment-status.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.payment, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => Customer, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  statusPayment: PaymentStatus;

  @BeforeInsert()
  @BeforeUpdate()
  calculateFinalAmount(): void {
    if (this.order?.orderItems?.length) {
      const total = this.order.orderItems
        .map((item) => item.product.price * item.quantity)
        .reduce((sum, subtotal) => sum + Number(subtotal), 0);
      this.amount = Number(total.toFixed(2));
    } else {
      this.amount = 0;
    }
  }
}
