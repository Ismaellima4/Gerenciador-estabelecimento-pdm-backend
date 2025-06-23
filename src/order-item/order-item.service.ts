import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { OrderItemResponseDTO } from './dto/order-item-response.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto[]) {
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    const orderItemSaved = await this.orderItemRepository.save(orderItem);
    return orderItemSaved;
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
