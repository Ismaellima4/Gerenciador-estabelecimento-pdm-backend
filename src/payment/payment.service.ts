import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentResponseDTO } from './dto/payment-response.dto';
import { PaymentStatus } from 'src/enum/payment-status.enum';
import { OrderService } from 'src/order/order.service';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDTO> {
    const { orderId, customerId, paymentType } = createPaymentDto;

    const order = await this.orderService.findOneWithRelations(orderId);

    if (!order) {
      throw new NotFoundException(`Pedido com id ${orderId} não encontrado.`);
    }

    const payment = new Payment();

    if (customerId) {
      const customer = await this.customerService.findOneEntity(customerId);
      if (!customer) {
        throw new NotFoundException(
          `Cliente com id ${customerId} não encontrado.`,
        );
      }
      payment.customer = customer;
    }

    payment.order = order;
    payment.paymentType = paymentType;

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

    if (payment.statusPayment === PaymentStatus.COMPLETED) {
      return new PaymentResponseDTO(payment);
    }

    const order = payment.order;

    order.orderItems.map((orderItem) => {
      const product = orderItem.product;

      if (orderItem.quantity <= product.amount) {
        product.amount -= orderItem.quantity;
      } else {
        product.amount = 0;
      }
    });

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
