import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import {PrismaService} from 'prisma/prisma.service';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule { }
