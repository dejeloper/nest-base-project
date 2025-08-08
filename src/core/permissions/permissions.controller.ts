import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode} from '@nestjs/common';

import {PermissionsService} from './permissions.service';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';
import {JwtAuthGuard} from '@/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('core/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @HttpCode(201)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.permissionsService.findAllPermissions();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.findPermissionById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.updatePermission(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.deletePermission(id);
  }

  @Get('user/:userId')
  @HttpCode(200)
  getPermissionsUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.permissionsService.getAllPermissionsByUserId(userId);
  }

  @Get('role/:roleId')
  @HttpCode(200)
  getPermissionsByRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.permissionsService.getAllPermissionsByRoleId(roleId);
  }
}
