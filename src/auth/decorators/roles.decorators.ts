import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enum/roles.enum';

export const ROLE_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
