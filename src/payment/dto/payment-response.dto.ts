import { Payment } from '../entities/payment.entity';

export class PaymentResponseDTO {
  id: string;
  paymentType: string;
  orderId: string;
  customerId: string;
  statusPayment: string;

  constructor(payment: Payment) {
    this.id = payment.id;
    this.paymentType = payment.paymentType;

    this.orderId = payment.order?.id ?? null;
    this.customerId = payment.customer?.id ?? null;

    this.statusPayment = payment.statusPayment;
  }
}
