import { IsArray, IsInt, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class AssignPermissionsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  permissionIds: number[];
}
