import {IsInt, IsString, IsNotEmpty} from 'class-validator';

export class CreateUserScheduleDto {
	@IsInt()
	userId: number;

	@IsInt()
	dayOfWeek: number;

	@IsString()
	@IsNotEmpty()
	startTime: string;

	@IsString()
	@IsNotEmpty()
	endTime: string;
}
