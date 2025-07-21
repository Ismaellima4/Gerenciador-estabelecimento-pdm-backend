import { ProductResposeDTO } from 'src/product/dto/product-respose.dto';
import { OrderItem } from '../entities/order-item.entity';

export class OrderItemResponseDTO {
  id: string;
  quantity: number;
  product: ProductResposeDTO;

  constructor(orderItem: OrderItem) {
    this.id = orderItem.id;
    this.quantity = orderItem.quantity;
    this.product = new ProductResposeDTO(orderItem.product);
  }
}
