import {IsEmail, IsInt, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	name: string;

	@IsInt()
	roleId: number;
}
