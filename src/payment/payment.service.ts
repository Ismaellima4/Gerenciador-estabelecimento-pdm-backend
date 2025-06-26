import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { PaymentResponseDTO } from './dto/payment-response.dto';
import { PaymentStatus } from 'src/enum/payment-status.enum';

@Injectable()
export class PaymentService {
  constructor(
     @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDTO> {
    const { orderId, customerId, paymentType } = createPaymentDto;

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const payment = this.paymentRepository.create({
      order,
      customer,
      paymentType,
    });

    const savedPayment = await this.paymentRepository.save(payment);
    return new PaymentResponseDTO(savedPayment);
  }

  async findAll(): Promise<PaymentResponseDTO[]> {
    const payments = await this.paymentRepository.find({
      relations: [
        'order',
        'order.orderItems',
        'order.orderItems.product',
        'customer',
      ],
    });
    return payments.map((payment) => new PaymentResponseDTO(payment));
  }

  async findOneEntity(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: [
        'order',
        'order.orderItems',
        'order.orderItems.product',
        'customer',
      ],
    });
    if (!payment) {
      throw new NotFoundException(`Payment not found with id ${id}`);
    }
    return payment;
  }

  async payOrder(id: string): Promise<PaymentResponseDTO> {
    const payment = await this.findOneEntity(id);

    payment.statusPayment = PaymentStatus.COMPLETED;
    payment.order.payment.statusPayment = PaymentStatus.COMPLETED;

    const pay = await this.paymentRepository.save(payment);

    return new PaymentResponseDTO(pay);
  }

  async cancelledPay(id: string): Promise<PaymentResponseDTO> {
    const payment = await this.findOneEntity(id);

    payment.statusPayment = PaymentStatus.CANCELLED;

    const cancelledPay = await this.paymentRepository.save(payment);

    return new PaymentResponseDTO(cancelledPay);
  }

  async findOne(id: string): Promise<PaymentResponseDTO> {
    const payment = await this.findOneEntity(id);
    return new PaymentResponseDTO(payment);
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentResponseDTO> {
    const payment = await this.findOneEntity(id);
    Object.assign(payment, updatePaymentDto);
    const updatedPayment = await this.paymentRepository.save(payment);
    return new PaymentResponseDTO(updatedPayment);
  }

  remove(id: string) {
    return this.paymentRepository.delete(id);
  }
}
