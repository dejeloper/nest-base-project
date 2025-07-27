import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {User} from '@prisma/client';
import {PrismaService} from 'prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) { }

	async login(email: string, password: string) {
		const user = await this.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException('Credenciales inválidas');
		}

		const payload = {sub: user.id, email: user.email, role: user.role};

		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}

	async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
		const user = await this.prisma.user.findUnique({where: {email}});

		if (!user || !user.isActive) return null;

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return null;

		const {password: _, ...result} = user;
		return result;
	}

}