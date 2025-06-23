import { ArrayMinSize, IsArray, IsString } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, {
    message: 'deve conter pelo menos 1 item na compra',
  })
  @IsString({ each: true })
  orderItems: CreateOrderItemDto[];
}
