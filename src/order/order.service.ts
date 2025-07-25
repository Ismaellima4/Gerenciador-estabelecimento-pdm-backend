import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRespondeDTO } from './dto/order-response.dto';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderItemService: OrderItemService,
  ) { }
  async create(createOrderDto: CreateOrderDto): Promise<OrderRespondeDTO> {
    const order = new Order();

    const orderItems = await this.orderItemService.create(
      createOrderDto.orderItems,
    );

    if (orderItems.length < 1) {
      throw new BadRequestException('Nenhum produto encontrado!');
    }

    order.orderItems = orderItems;

    const orderSaved = await this.orderRepository.save(order);

    const orderWithRelations = await this.orderRepository.findOne({
      where: { id: orderSaved.id },
      relations: [
        'payment',
        'orderItems',
        'orderItems.product',
        'orderItems.product.category',
        'orderItems.product.supplier',
      ],
    });

    if (!orderWithRelations) {
      throw new NotFoundException('Pedido não encontrado após salvar.');
    }

    return new OrderRespondeDTO(orderWithRelations);
  }

  async findOneWithRelations(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: [
        'payment',
        'orderItems',
        'orderItems.product',
        'orderItems.product.category',
        'orderItems.product.supplier',
      ],
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return order;
  }

  async findAll(): Promise<OrderRespondeDTO[]> {
    const orders = await this.orderRepository.find({
      relations: [
        'payment',
        'orderItems',
        'orderItems.product',
        'orderItems.product.category',
        'orderItems.product.supplier',
      ],
    });
    return orders.map((order) => new OrderRespondeDTO(order));
  }

  async findOneEntity(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        'payment',
        'orderItems',
        'orderItems.product',
        'orderItems.product.category',
        'orderItems.product.supplier',
      ],
    });
    if (!order) {
      throw new NotFoundException(`Pedido não encontrado com id ${id}`);
    }
    return order;
  }

  async findOne(id: string): Promise<OrderRespondeDTO> {
    const order = await this.findOneEntity(id);
    return new OrderRespondeDTO(order);
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderRespondeDTO> {
    const orderUpdating = await this.findOneEntity(id);
    Object.assign(orderUpdating, updateOrderDto);
    const orderSaved = await this.orderRepository.save(orderUpdating);
    return new OrderRespondeDTO(orderSaved);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
