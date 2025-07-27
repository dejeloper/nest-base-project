import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from 'prisma/prisma.service';

import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {email: data.email},
      });

      if (existingUser) {
        throw new BadRequestException('El correo ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      return await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          roleId: data.roleId,
          isActive: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el usuario: ${error.message}`);
    }
  }

  async findAllUsers() {
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

  async findUserById(id: number) {
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
        throw new NotFoundException(`Usuario encontrado`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario');
    }
  }

  async updateUser(id: number, data: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {id}
      });

      if (!existingUser) {
        throw new NotFoundException(`Usuario no encontrado`);
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      return await this.prisma.user.update({
        where: {id},
        data: {
          ...data,
          updatedAt: new Date(),
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar usuario');
    }
  }

  async deleteUser(id: number) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {id}
      });

      if (!existingUser) {
        throw new NotFoundException(`Usuario no encontrado`);
      }

      return await this.prisma.user.delete({
        where: {id}
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar usuario');
    }
  }
}