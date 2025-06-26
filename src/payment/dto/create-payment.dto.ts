import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { PaymentType } from 'src/enum/payment-type.enum';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsEnum(PaymentType)
  @IsNotEmpty()
  paymentType: PaymentType;
}
