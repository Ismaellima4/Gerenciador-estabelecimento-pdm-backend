import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
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
