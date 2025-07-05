import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { SupplierModule } from './supplier/supplier.module';
import { Supplier } from './supplier/entities/supplier.entity';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { CustomerModule } from './customer/customer.module';
import { Order } from './order/entities/order.entity';
import { Payment } from './payment/entities/payment.entity';
import { Customer } from './customer/entities/customer.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'gerenciador_estabelecimento',
      entities: [
        Category,
        Product,
        Supplier,
        Order,
        Payment,
        Customer,
        OrderItem,
        User,
      ],
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    SupplierModule,
    OrderItemModule,
    OrderModule,
    PaymentModule,
    CustomerModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
