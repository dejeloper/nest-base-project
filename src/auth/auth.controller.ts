import {Body, Controller, Post} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) { }

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.AuthService.login(loginDto.email, loginDto.password);
	}

}
