import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  cpf: string;
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @IsOptional()
  phoneNumber?: string;
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;
}
