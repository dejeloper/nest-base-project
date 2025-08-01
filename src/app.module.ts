import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {PrismaModule} from 'prisma/prisma.module';
import {AuthModule} from '@/auth/auth.module';
import {UserModule} from '@/user/user.module';
import {RoleModule} from '@/role/role.module';
import {PermissionsModule} from '@/permissions/permissions.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, RoleModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 