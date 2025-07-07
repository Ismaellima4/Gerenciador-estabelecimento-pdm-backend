import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLE_KEY } from 'src/auth/decorators/roles.decorators';
import { UserRole } from 'src/enum/roles.enum';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true; // sem role definida, acesso liberado
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserResponseDto;
    return user.role === requiredRole;
  }
}
