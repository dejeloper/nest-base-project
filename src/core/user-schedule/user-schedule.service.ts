import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';

import {CreateUserScheduleDto} from './dto/create-user-schedule.dto';
import {UpdateUserScheduleDto} from './dto/update-user-schedule.dto';

@Injectable()
export class UserScheduleService {
  constructor(private prisma: PrismaService) { }

  async createUserSchedule(data: CreateUserScheduleDto) {
    const existingSchedule = await this.prisma.userSchedule.findFirst({
      where: {userId: data.userId, dayOfWeek: data.dayOfWeek},
    });

    if (existingSchedule) {
      throw new HttpException('El horario para este usuario ya está registrado', HttpStatus.BAD_REQUEST);
    }

    const validationError = this.validateScheduleInput(data);
    if (validationError) {
      throw new HttpException(validationError, HttpStatus.BAD_REQUEST);
    }

    return this.prisma.userSchedule.create({
      data
    });
  }

  async findAllUserSchedules() {
    return this.prisma.userSchedule.findMany({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        dayOfWeek: true,
        startTime: true,
        endTime: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const schedule = await this.prisma.userSchedule.findUnique({
      where: {id},
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        dayOfWeek: true,
        startTime: true,
        endTime: true,
      },
    });

    if (!schedule) {
      throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
    }

    return schedule;
  }

  async updateUserSchedule(id: number, data: UpdateUserScheduleDto) {
    const existingSchedule = await this.prisma.userSchedule.findUnique({
      where: {id: id},
    });

    if (!existingSchedule) {
      throw new HttpException('No se encontró un horario existente para actualizar', HttpStatus.NOT_FOUND);
    }

    const validationError = this.validateScheduleInput(data, true);
    if (validationError) {
      throw new HttpException(validationError, HttpStatus.BAD_REQUEST);
    }

    return this.prisma.userSchedule.update({
      where: {id},
      data
    });
  }

  async removeSchedule(id: number) {
    const existingSchedule = await this.prisma.userSchedule.findUnique({
      where: {id},
    });

    if (!existingSchedule) {
      throw new HttpException(
        'No se encontró un horario existente para eliminar',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.userSchedule.delete({
      where: {id},
    });

    return {message: 'Horario eliminado correctamente'};
  }

  private validateScheduleInput(data: CreateUserScheduleDto | UpdateUserScheduleDto, isUpdate = false): string | undefined {
    if (!isUpdate && !data.userId) {
      return 'El ID de usuario es obligatorio';
    }

    if (data.dayOfWeek != null && (data.dayOfWeek < 0 || data.dayOfWeek > 6)) {
      return 'El día de la semana debe estar entre 0 y 6';
    }

    if (data.startTime && data.endTime) {
      const timeValidation = this.validateTimeSchedule(data.startTime, data.endTime);
      if (timeValidation) {
        return timeValidation;
      }
    }
  }

  private validateTimeSchedule(startTime: string, endTime: string): string | undefined {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(startTime)) {
      return 'La hora inicio debe estar en formato HH:MM';
    }

    if (!timeRegex.test(endTime)) {
      return 'La hora fin debe estar en formato HH:MM';
    }

    const [hoursStart, minutesStart] = startTime.split(':').map(Number);
    const [hoursEnd, minutesEnd] = endTime.split(':').map(Number);

    const now = new Date();

    const startDate = new Date(now);
    startDate.setHours(hoursStart, minutesStart, 0, 0);

    const endDate = new Date(now);
    endDate.setHours(hoursEnd, minutesEnd, 0, 0);

    if (startDate >= endDate) {
      return 'La hora de inicio debe ser anterior a la hora de fin';
    }

    // TODO: Read and validate the limit time from parameters
    const limitTime = {
      hoursMin: 6,
      minutesMin: 0,
      hoursMax: 21,
      minutesMax: 0
    };

    const minTime = new Date(now);
    minTime.setHours(limitTime.hoursMin, limitTime.minutesMin, 0, 0);

    const maxTime = new Date(now);
    maxTime.setHours(limitTime.hoursMax, limitTime.minutesMax, 0, 0);

    if (startDate < minTime || endDate > maxTime) {
      return `Las horas deben estar dentro del horario permitido (${limitTime.hoursMin
        }:${String(limitTime.minutesMin).padStart(2, '0')} - ${limitTime.hoursMax
        }:${String(limitTime.minutesMax).padStart(2, '0')})`;
    }

    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMinutes = durationMs / 60000;

    if (durationMinutes < 30) {
      return 'La duración mínima debe ser de 30 minutos';
    }

    if (minutesStart % 30 !== 0 || minutesEnd % 30 !== 0) {
      return 'Las horas deben estar en intervalos de 30 minutos';
    }
  }
}
