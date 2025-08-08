import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException, HttpException} from '@nestjs/common';
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al crear el permiso`);
    }
  }

  async findAllPermissions() {
    try {
      return await this.prisma.permission.findMany({

        orderBy: {createdAt: 'desc'},
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
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
      if (error instanceof HttpException) {
        throw error;
      }
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
      if (error instanceof HttpException) {
        throw error;
      }
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al eliminar el permiso`);
    }
  }

  async getAllPermissionsByUserId(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {id: userId},
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true
                }
              }
            }
          },
          userPermissions: {
            include: {
              permission: true
            }
          }
        }
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const rolePermissions = user.role.rolePermissions
        .map((rp) => rp.permission)
        .sort((a, b) => a.id - b.id);
      const directPermissions = user.userPermissions
        .map((up) => up.permission)
        .sort((a, b) => a.id - b.id);

      const allPermissionsMap = new Map();
      [...rolePermissions, ...directPermissions].forEach((perm) =>
        allPermissionsMap.set(perm.id, perm),
      );

      return Array.from(allPermissionsMap.values());
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al obtener permisos del usuario`);
    }
  }

  async getAllPermissionsByRoleId(roleId: number) {
    try {
      const role = await this.prisma.role.findUnique({
        where: {id: roleId},
        include: {
          rolePermissions: {
            include: {
              permission: true
            }
          }
        }
      });

      if (!role) {
        throw new NotFoundException('Rol no encontrado');
      }

      return role.rolePermissions.map((rp) => rp.permission);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al obtener permisos del rol`);
    }
  }
}