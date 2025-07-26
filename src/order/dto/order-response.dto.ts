import { OrderStatus } from 'src/enum/order-status.enum';
import { Order } from '../entities/order.entity';
import { OrderItemResponseDTO } from 'src/order-item/dto/order-item-response.dto';

export class OrderRespondeDTO {
  id: string;
  orderItems: OrderItemResponseDTO[];
  date: Date;
  orderStatus: OrderStatus;
  paymentId?: string;

  constructor(order: Order) {
    this.id = order.id;
    this.date = order.date;
    this.orderStatus = order.status;
    this.paymentId = order.payment?.id ?? null;
    this.orderItems = order.orderItems.map(
      (orderItem) => new OrderItemResponseDTO(orderItem),
    );
  }
}
