import { OrderItem } from '../entities/order-item.entity';

export class OrderItemResponseDTO {
  id: string;
  quantity: number;
  productId: string | null;
  productName: string | null;

  constructor(orderItem: OrderItem) {
    this.id = orderItem.id;
    this.quantity = orderItem.quantity;
    this.productId = orderItem.product?.id ?? null;
  }
}
