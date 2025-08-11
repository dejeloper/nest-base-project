import {Injectable} from '@/core/shared/dependency-injection/injectable';

//domain
import {Payment, PrimitivePayment} from '@/core/payments/domain/entities/payment';
import {PaymentRepository} from '@/core/payments/domain/repositories/payment.repository';

// application
import {CreatePaymentDto} from '@/core/payments/application/dto/create-payment.dto';

@Injectable()
export class CreatePaymentUseCase {
	constructor(private readonly paymentRepository: PaymentRepository) { }

	async execute(dto: CreatePaymentDto): Promise<{payment: PrimitivePayment}> {
		const payment = Payment.create(dto);
		await this.paymentRepository.create(payment);

		return {payment: payment.toPrimitive()};
	}
} 