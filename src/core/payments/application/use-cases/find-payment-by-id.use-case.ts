import {Injectable} from "@/core/shared/dependency-injection/injectable";

// domain
import {PrimitivePayment} from "@/core/payments/domain/entities/payment";
import {PaymentRepository} from "@/core/payments/domain/repositories/payment.repository";
import {PaymentNotFoundException} from "@/core/payments/domain/exceptions/payment.exception";

// application
import {FindPaymentByIdDto} from "@/core/payments/application/dto/find-payment-by-id.dto";

@Injectable()
export class FindPaymentByIdUseCase {
	constructor(private paymentRepository: PaymentRepository) { }

	async execute(findPaymentByIdDto: FindPaymentByIdDto): Promise<{payment: PrimitivePayment}> {
		const payment = await this.paymentRepository.findById(findPaymentByIdDto.id);

		if (!payment) {
			throw new PaymentNotFoundException(findPaymentByIdDto.id);
		}

		return {payment: payment.toPrimitive()}
	}
}