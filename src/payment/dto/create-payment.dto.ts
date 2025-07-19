import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaymentType } from 'src/enum/payment-type.enum';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

export class CreatePaymentDto {
  @Type(() => CreateOrderDto)
  @IsNotEmpty()
  order: CreateOrderDto;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  customerId?: string;

  @IsEnum(PaymentType)
  @IsNotEmpty()
  paymentType: PaymentType;
}
