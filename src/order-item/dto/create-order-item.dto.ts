import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productID: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
