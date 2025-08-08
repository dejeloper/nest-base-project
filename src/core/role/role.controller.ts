import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode} from '@nestjs/common';

import {RoleService} from './role.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {JwtAuthGuard} from '@/auth/jwt/jwt-auth.guard';

import {AssignPermissionsDto} from '@/user/dto/assign-permissions.dto';

@UseGuards(JwtAuthGuard)
@Controller('core/role')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	@Post()
	@HttpCode(201)
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.createRole(createRoleDto);
	}

	@Get()
	@HttpCode(200)
	findAll() {
		return this.roleService.findAllRoles();
	}

	@Get(':id')
	@HttpCode(200)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.roleService.findRoleById(id);
	}

	@Patch(':id')
	@HttpCode(200)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.updateRole(id, updateRoleDto);
	}

	@Delete(':id')
	@HttpCode(204)
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.roleService.deleteRole(id);
	}

	@Post(':id/permissions')
	@HttpCode(201)
	async assignPermissionsToRole(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: AssignPermissionsDto,
	) {
		return this.roleService.assignPermissionsToRole(id, dto.permissionIds);
	}
}