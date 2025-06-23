import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRespondeDTO } from './dto/customer-response.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerRespondeDTO> {
    const customer = this.customerRepository.create(createCustomerDto);
    const customerSaved = await this.customerRepository.save(customer);
    return new CustomerRespondeDTO(customerSaved);
  }

  async findAll(): Promise<CustomerRespondeDTO[]> {
    const customers = await this.customerRepository.find({
      relations: ['payments'],
    });
    return customers.map((customer) => new CustomerRespondeDTO(customer));
  }

  async findOne(id: string): Promise<CustomerRespondeDTO> {
    const customer = await this.findOneEntity(id);
    return new CustomerRespondeDTO(customer);
  }

  async findOneEntity(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Cliente não encontrado com o id`);
    }

    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerRespondeDTO> {
    const customerUpdating = await this.findOneEntity(id);
    Object.assign(customerUpdating, updateCustomerDto);
    const customerSaved = await this.customerRepository.save(customerUpdating);
    return new CustomerRespondeDTO(customerSaved);
  }

  async remove(id: string) {
    return this.customerRepository.delete(id);
  }
}
