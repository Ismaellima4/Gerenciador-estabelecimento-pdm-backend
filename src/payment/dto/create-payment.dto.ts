import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaymentType } from 'src/enum/payment-type.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  orderId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  customerId?: string;

  @IsEnum(PaymentType)
  @IsNotEmpty()
  paymentType: PaymentType;
}
