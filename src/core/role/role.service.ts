import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(data: CreateRoleDto) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: data.name },
      });

      if (existingRole) {
        throw new BadRequestException('El rol ya existe');
      }

      return await this.prisma.role.create({
        data: {
          name: data.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al crear el rol`);
    }
  }

  async findAllRoles() {
    try {
      return await this.prisma.role.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al obtener roles`);
    }
  }

  async findRoleById(id: number) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!role) {
        throw new NotFoundException('Rol no encontrado');
      }

      return role;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al obtener el rol`);
    }
  }

  async updateRole(id: number, data: UpdateRoleDto) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { id },
      });

      if (!existingRole) {
        throw new NotFoundException('Rol no encontrado');
      }

      return await this.prisma.role.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al actualizar el rol`);
    }
  }

  async deleteRole(id: number) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { id },
      });

      if (!existingRole) {
        throw new NotFoundException('Rol no encontrado');
      }

      return await this.prisma.role.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al eliminar el rol`);
    }
  }

  async assignPermissionsToRole(roleId: number, permissionIds: number[]) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!role) {
        throw new NotFoundException('Rol no encontrado');
      }

      if (permissionIds.length !== new Set(permissionIds).size) {
        throw new BadRequestException('Los IDs de permisos deben ser únicos');
      }

      const relations = permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      }));

      return await this.prisma.rolePermission.createMany({
        data: relations,
        skipDuplicates: true,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error al asignar permisos al rol`,
      );
    }
  }
}
