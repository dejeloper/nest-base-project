import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';

@Controller('core/auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) { }

	@Post('login')
	@HttpCode(200)
	async login(@Body() loginDto: LoginDto) {
		return this.AuthService.login(loginDto.email, loginDto.password);
	}

}
