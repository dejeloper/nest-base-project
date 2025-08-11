import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';

import { UserScheduleService } from './user-schedule.service';
import { CreateUserScheduleDto } from './dto/create-user-schedule.dto';
import { UpdateUserScheduleDto } from './dto/update-user-schedule.dto';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('core/user-schedule')
export class UserScheduleController {
  constructor(private readonly userScheduleService: UserScheduleService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserScheduleDto: CreateUserScheduleDto) {
    return this.userScheduleService.createUserSchedule(createUserScheduleDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userScheduleService.findAllUserSchedules();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userScheduleService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserScheduleDto: UpdateUserScheduleDto,
  ) {
    return this.userScheduleService.updateUserSchedule(
      id,
      updateUserScheduleDto,
    );
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userScheduleService.removeSchedule(id);
  }
}
