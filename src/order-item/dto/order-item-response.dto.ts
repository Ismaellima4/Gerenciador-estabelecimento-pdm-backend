import { OrderItem } from '../entities/order-item.entity';

export class OrderItemResponseDTO {
  id: string;
  productName: string;
  productID: string;
  quantity: number;
  constructor(orderItem: OrderItem) {
    this.id = orderItem.id;
    this.productName = orderItem.product.productName;
    this.quantity = orderItem.quantity;
    this.productID = orderItem.product.id;
  }
}
