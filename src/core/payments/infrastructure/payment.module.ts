import {Module} from '@nestjs/common';

// domain
import {PaymentRepository} from '@/core/payments/domain/repositories/payment.repository';

// application
import {CreatePaymentUseCase} from '@/core/payments/application/use-cases/create-payment.use-case';
import {FindAllPaymentsUseCase} from '@/core/payments/application/use-cases/find-all-payments.use-case';
import {FindPaymentByIdUseCase} from '@/core/payments/application/use-cases/find-payment-by-id.use-case';
import {FindPaymentByCustomerIdUseCase} from '@/core/payments/application/use-cases/find-payment-by-customerId.use-case';

// infrastructure 
import {PaymentController} from '@/core/payments/infrastructure/http-api/controller/payment.controller';
import {PrismaPaymentRepository} from '@/core/payments/infrastructure/repositories/PrismaPaymentRepository';

@Module({
	controllers: [PaymentController],
	providers: [
		CreatePaymentUseCase,
		FindAllPaymentsUseCase,
		FindPaymentByIdUseCase,
		FindPaymentByCustomerIdUseCase,
		PrismaPaymentRepository,
		{
			provide: PaymentRepository,
			useClass: PrismaPaymentRepository,
		}
	],
	exports: [CreatePaymentUseCase, FindPaymentByIdUseCase, FindAllPaymentsUseCase, FindPaymentByCustomerIdUseCase]
})
export class PaymentModule { }