import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, {
    message: 'deve conter pelo menos 1 item na compra',
  })
  @ValidateNested({ each: true }) // Valida cada item com as regras do DTO
  @Type(() => CreateOrderItemDto) 
  orderItems: CreateOrderItemDto[];
}
