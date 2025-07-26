import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from 'prisma/prisma.service';

import {UpdateUserDto} from './dto/update-user.dto';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: {email: data.email},
      });

      if (existing) {
        throw new BadRequestException('El correo ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {id},
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario');
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({where: {id}});
      if (!existing) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      return await this.prisma.user.update({
        where: {id},
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar usuario');
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.user.findUnique({where: {id}});
      if (!existing) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return await this.prisma.user.delete({where: {id}});
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar usuario');
    }
  }
}