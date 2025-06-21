import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  supplierName: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cnpj?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  additionalInformation?: string;
}
