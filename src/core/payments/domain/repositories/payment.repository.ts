import {Payment} from "@/core/payments/domain/entities/payment";

export abstract class PaymentRepository {
	abstract create(payment: Payment): Promise<void>;
	abstract findAll(): Promise<Payment[]>;
	abstract findById(id: string): Promise<Payment | null>;
	abstract findByCustomerId(customerId: string): Promise<Payment[]>;
}