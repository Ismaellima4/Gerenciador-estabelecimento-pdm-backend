import { OrderStatus } from 'src/enum/order-status.enum';
import { Order } from '../entities/order.entity';
import { OrderItemResponseDTO } from 'src/order-item/dto/order-item-response.dto';
import { PaymentResponseDTO } from 'src/payment/dto/payment-response.dto';

export class OrderRespondeDTO {
  id: string;
  orderItems: OrderItemResponseDTO[];
  date: Date;
  status: OrderStatus;
  payment?: PaymentResponseDTO | null;

  constructor(order: Order) {
    this.id = order.id;
    this.date = order.date;
    this.status = order.status;
    this.payment = order.payment ? new PaymentResponseDTO(order.payment) : null;
    this.orderItems = order.orderItems.map(
      (orderItem) => new OrderItemResponseDTO(orderItem),
    );
  }
}
