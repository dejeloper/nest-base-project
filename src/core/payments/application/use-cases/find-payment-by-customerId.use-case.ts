import { Injectable } from '@/core/shared/dependency-injection/injectable';

// domain
import { PrimitivePayment } from '@/core/payments/domain/entities/payment';
import { PaymentRepository } from '@/core/payments/domain/repositories/payment.repository';

// application
import { FindPaymentByCustomerIdDto } from '@/core/payments/application/dto/find-payment-by-customerId.dto';

@Injectable()
export class FindPaymentByCustomerIdUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(
    findPaymentByCustomerIdDto: FindPaymentByCustomerIdDto,
  ): Promise<{ payments: PrimitivePayment[] }> {
    const payments = await this.paymentRepository.findByCustomerId(
      findPaymentByCustomerIdDto.customerId,
    );
    return { payments: payments.map((payment) => payment.toPrimitive()) };
  }
}
