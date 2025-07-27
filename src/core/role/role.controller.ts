import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';

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
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.createRole(createRoleDto);
	}

	@Get()
	findAll() {
		return this.roleService.findAllRoles();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.roleService.findRoleById(id);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.updateRole(id, updateRoleDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.roleService.deleteRole(id);
	}

	@Post(':id/permissions')
	async assignPermissionsToRole(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: AssignPermissionsDto,
	) {
		return this.roleService.assignPermissionsToRole(id, dto.permissionIds);
	}
}