import { OrderItem } from '../entities/order-item.entity';

export class OrderItemResponseDTO {
  id: string;
  orderID: string;
  productName: string;
  quantity: number;
  constructor(orderItem: OrderItem) {
    this.id = orderItem.id;
    this.orderID = orderItem.order.id;
    this.productName = orderItem.product.productName;
    this.quantity = orderItem.quantity;
  }
}
