import { Module } from '@nestjs/common';
import { UserScheduleService } from './user-schedule.service';
import { UserScheduleController } from './user-schedule.controller';

@Module({
  controllers: [UserScheduleController],
  providers: [UserScheduleService],
})
export class UserScheduleModule {}
