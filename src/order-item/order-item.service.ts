import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { OrderItemResponseDTO } from './dto/order-item-response.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto[]): Promise<OrderItem[]> {
    const orderItems: OrderItem[] = [];

    for (const itemDto of createOrderItemDto) {
      const product = await this.productRepository.findOne({
        where: { id: itemDto.productID },
      });

      if (!product) {
        throw new NotFoundException(
          `Produto com ID ${itemDto.productID} não encontrado`,
        );
      }

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = itemDto.quantity;
      orderItems.push(orderItem);
    }

    return orderItems;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    if (!orderItem) {
      throw new NotFoundException(`Item não encontrado com o id: ${id}`);
    }
    Object.assign(orderItem, updateOrderItemDto);
    const orderItemSaved = await this.orderItemRepository.save(orderItem);
    return new OrderItemResponseDTO(orderItemSaved);
  }
  remove(id: string) {
    return this.orderItemRepository.delete(id);
  }
}
