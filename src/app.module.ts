import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {PrismaModule} from 'prisma/prisma.module';
import {AuthModule} from '@/auth/auth.module';
import {UserModule} from '@/user/user.module';
import {RoleModule} from '@/core/role/role.module';
import {PermissionsModule} from '@/core/permissions/permissions.module';
import {UserScheduleModule} from '@/core/user-schedule/user-schedule.module';
import {PaymentModule} from './core/payments/infrastructure/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, cache: true}),
    PrismaModule, UserModule, AuthModule, RoleModule, PermissionsModule, UserScheduleModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 