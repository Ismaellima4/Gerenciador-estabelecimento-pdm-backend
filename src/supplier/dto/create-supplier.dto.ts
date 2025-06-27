import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  supplierName: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(14, 18, {
    message:
      'O CNPJ deve ter entre 14 e 18 caracteres (com ou sem formatação).',
  })
  @Matches(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/, {
    message:
      'CNPJ inválido. Use o formato XX.XXX.XXX/XXXX-XX ou apenas números.',
  })
  cnpj?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  additionalInformation?: string;
}
