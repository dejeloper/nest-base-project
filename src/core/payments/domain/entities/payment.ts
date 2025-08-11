import {v4 as uuidv4} from 'uuid';

export interface PrimitivePayment {
	id: string;
	amount: number;
	customerId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Payment {
	constructor(private attributes: PrimitivePayment) { }

	static create(createPayment: {amount: number; customerId: string}): Payment {
		return new Payment({
			id: uuidv4(),
			amount: createPayment.amount,
			customerId: createPayment.customerId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	static fromPrimitives(data: PrimitivePayment): Payment {
		return new Payment(data);
	}

	toPrimitive(): PrimitivePayment {
		return {...this.attributes};
	}
}
