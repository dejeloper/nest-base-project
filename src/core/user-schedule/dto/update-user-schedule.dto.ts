import { PartialType } from '@nestjs/mapped-types';
import { CreateUserScheduleDto } from './create-user-schedule.dto';

export class UpdateUserScheduleDto extends PartialType(CreateUserScheduleDto) {}
