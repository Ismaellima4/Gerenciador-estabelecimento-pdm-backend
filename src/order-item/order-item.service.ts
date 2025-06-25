import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { OrderItemResponseDTO } from './dto/order-item-response.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productService: ProductService,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto[]) {
    const products = await this.productService.findAllById(
      createOrderItemDto.map((orderItem) => orderItem.productID),
    );

    const productMap = new Map<string, Product>();
    products.forEach((product) => {
      productMap.set(product.id, product);
    });

    const orderItemsToSave: OrderItem[] = [];

    for (const itemDto of createOrderItemDto) {
      const product = productMap.get(itemDto.productID);

      if (product) {
        const orderItem = this.orderItemRepository.create(itemDto);
        orderItem.product = product;
        orderItemsToSave.push(orderItem);
      }
    }

    if (orderItemsToSave.length === 0) {
      throw new BadRequestException(
        'Nenhum item de pedido pôde ser criado. Verifique se os produtos informados existem.',
      );
    }

    const savedOrderItems =
      await this.orderItemRepository.save(orderItemsToSave);

    return savedOrderItems;
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
