import { PaymentResponseDTO } from 'src/payment/dto/payment-response.dto';
import { Customer } from '../entities/customer.entity';

export class CustomerRespondeDTO {
  id: string;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  payments: PaymentResponseDTO[];

  constructor(customer: Customer) {
    this.id = customer.id;
    this.email = customer.email;
    this.cpf = customer.cpf;
    this.name = customer.name;
    this.phoneNumber = customer.phoneNumber;
  }
}
