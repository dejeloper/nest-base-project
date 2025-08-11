import { PrismaClient } from '@prisma/client';
import { Injectable } from '@/core/shared/dependency-injection/injectable';

// domain
import { Payment } from '@/core/payments/domain/entities/payment';
import { PaymentRepository } from '@/core/payments/domain/repositories/payment.repository';

@Injectable()
export class PrismaPaymentRepository extends PaymentRepository {
  private prisma = new PrismaClient();

  async create(payment: Payment): Promise<void> {
    await this.prisma.payment.create({
      data: payment.toPrimitive(),
    });
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany();
    return payments.map((payment) => Payment.fromPrimitives(payment));
  }

  async findById(id: string): Promise<Payment | null> {
    const paymentFound = await this.prisma.payment.findUnique({
      where: { id },
    });
    return paymentFound ? Payment.fromPrimitives(paymentFound) : null;
  }

  async findByCustomerId(customerId: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { customerId },
    });
    return payments.map((payment) => Payment.fromPrimitives(payment));
  }
}
