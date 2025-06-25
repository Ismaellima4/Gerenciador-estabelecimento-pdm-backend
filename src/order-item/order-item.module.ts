import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './order-item.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), ProductModule],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
