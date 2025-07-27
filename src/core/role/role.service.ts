import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';

import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';

@Injectable()
export class RoleService {
	constructor(private prisma: PrismaService) { }

	async createRole(data: CreateRoleDto) {
		try {
			const existingRole = await this.prisma.role.findUnique({
				where: {name: data.name},
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
			throw new InternalServerErrorException(`Error al crear el rol: ${error.message}`);
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
			throw new InternalServerErrorException(`Error al obtener roles: ${error.message}`);
		}
	}

	async findRoleById(id: number) {
		try {
			const role = await this.prisma.role.findUnique({
				where: {id},
			});

			if (!role) {
				throw new NotFoundException('Rol no encontrado');
			}

			return role;
		} catch (error) {
			throw new InternalServerErrorException(`Error al obtener el rol: ${error.message}`);
		}
	}

	async updateRole(id: number, data: UpdateRoleDto) {
		try {
			const existingRole = await this.prisma.role.findUnique({
				where: {id},
			});

			if (!existingRole) {
				throw new NotFoundException('Rol no encontrado');
			}

			return await this.prisma.role.update({
				where: {id},
				data: {
					name: data.name,
					updatedAt: new Date(),
				},
			});
		} catch (error) {
			throw new InternalServerErrorException(`Error al actualizar el rol: ${error.message}`);
		}
	}

	async deleteRole(id: number) {
		try {
			const existingRole = await this.prisma.role.findUnique({
				where: {id},
			});

			if (!existingRole) {
				throw new NotFoundException('Rol no encontrado');
			}

			return await this.prisma.role.delete({
				where: {id},
			});
		} catch (error) {
			throw new InternalServerErrorException(`Error al eliminar el rol: ${error.message}`);
		}
	}
}
