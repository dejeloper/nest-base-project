import {Body, Controller, Get, Param, Post} from "@nestjs/common";

// domain
import {PrimitivePayment} from "@/core/payments/domain/entities/payment";

// application
import {FindPaymentByCustomerIdDto} from "@/core/payments/application/dto/find-payment-by-customerId.dto";
import {FindPaymentByIdDto} from "@/core/payments/application/dto/find-payment-by-id.dto";
import {CreatePaymentUseCase} from '@/core/payments/application/use-cases/create-payment.use-case';
import {FindPaymentByIdUseCase} from "@/core/payments/application/use-cases/find-payment-by-id.use-case";
import {FindAllPaymentsUseCase} from "@/core/payments/application/use-cases/find-all-payments.use-case";
import {FindPaymentByCustomerIdUseCase} from "@/core/payments/application/use-cases/find-payment-by-customerId.use-case";

// infrastructure
import {CreatePaymentHttpDto} from '@/core/payments/infrastructure/http-api/dto/create-payment.http-dto';

@Controller("payments")
export class PaymentController {
	constructor(
		private readonly createPaymentUseCase: CreatePaymentUseCase,
		private readonly findAllPaymentsUseCase: FindAllPaymentsUseCase,
		private readonly findPaymentByIdUseCase: FindPaymentByIdUseCase,
		private readonly findPaymentByCustomerIdUseCase: FindPaymentByCustomerIdUseCase,
	) { }

	@Post()
	async createPaymentRequest(@Body() createPaymentHttpDto: CreatePaymentHttpDto): Promise<{payment: PrimitivePayment}> {
		return await this.createPaymentUseCase.execute(createPaymentHttpDto)
	}

	@Get()
	async findAll(): Promise<{payments: PrimitivePayment[]}> {
		return await this.findAllPaymentsUseCase.execute();
	}

	@Get(":id")
	async findPaymentByIdRequest(@Param() findPaymentByIdDto: FindPaymentByIdDto): Promise<{payment: PrimitivePayment}> {
		return await this.findPaymentByIdUseCase.execute(findPaymentByIdDto);
	}

	@Get("customer/:customerId")
	async findPaymentByCustomerIdRequest(@Param() findPaymentByCustomerIdDto: FindPaymentByCustomerIdDto): Promise<{payments: PrimitivePayment[]}> {
		return await this.findPaymentByCustomerIdUseCase.execute(findPaymentByCustomerIdDto);
	}
}