import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';

import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) { }

  async createPermission(data: CreatePermissionDto) {
    try {
      const existingPermission = await this.prisma.permission.findUnique({
        where: {name: data.name},
      });

      if (existingPermission) {
        throw new BadRequestException('El permiso ya existe');
      }

      return await this.prisma.permission.create({
        data: {
          name: data.name,
          description: data.description,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el permiso`);
    }
  }

  async findAllPermissions() {
    try {
      return await this.prisma.permission.findMany({

        orderBy: {createdAt: 'desc'},
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener permisos`);
    }
  }

  async findPermissionById(id: number) {
    try {
      const permission = await this.prisma.permission.findUnique({
        where: {id},
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!permission) {
        throw new NotFoundException('Permiso no encontrado');
      }

      return permission;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el permiso`);
    }
  }

  async updatePermission(id: number, data: UpdatePermissionDto) {
    try {
      const existingPermission = await this.prisma.permission.findUnique({
        where: {id},
      });

      if (!existingPermission) {
        throw new NotFoundException('Permiso no encontrado');
      }

      return await this.prisma.permission.update({
        where: {id},
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el permiso`);
    }
  }

  async deletePermission(id: number) {
    try {
      const existingPermission = await this.prisma.permission.findUnique({
        where: {id},
      });

      if (!existingPermission) {
        throw new NotFoundException('Permiso no encontrado');
      }

      return await this.prisma.permission.delete({
        where: {id},
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el permiso`);
    }
  }
}