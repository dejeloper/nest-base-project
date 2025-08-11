import {Injectable} from "@/core/shared/dependency-injection/injectable";

// domain
import {PrimitivePayment} from '@/core/payments/domain/entities/payment';
import {PaymentRepository} from "@/core/payments/domain/repositories/payment.repository";

@Injectable()
export class FindAllPaymentsUseCase {
	constructor(private readonly paymentRepository: PaymentRepository) { }

	async execute(): Promise<{payments: PrimitivePayment[]}> {
		const allPayments = await this.paymentRepository.findAll();
		return {payments: allPayments.map(payment => payment.toPrimitive())};
	}

}