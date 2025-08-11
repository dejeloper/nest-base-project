import {IsNotEmpty, IsUUID} from "class-validator";


export class FindPaymentByIdHttpDto {

	@IsUUID()
	@IsNotEmpty()
	id!: string;
}