import { Payment } from '../entities/payment.entity';

export class PaymentResponseDTO {
  id: string;
  paymentType: string;
  orderId: string;
  customerId: string;
  statusPayment: string;
  date: Date;
  amount: number;

  constructor(payment: Payment) {
    this.id = payment.id;
    this.amount = payment.amount;
    this.paymentType = payment.paymentType;
    this.orderId = payment.order?.id ?? null;
    this.customerId = payment.customer?.id ?? null;
    this.statusPayment = payment.statusPayment;
    this.date = payment.date;
  }
}
