/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: any = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // Mock User Injection (Biasanya ini didapat dari dekode JWT Token)
    // Untuk keperluan simulasi, kita pasang user mock di request
    request.user = {
      id: 1,
      email: 'mock@example.com',
      role: Role.USER, // Default mock role
    };

    // Jika ingin simulasi role admin, kirim header: Authorization: Bearer admin
    if (authHeader.includes('admin')) {
      request.user.role = Role.ADMIN;
    }

    return true;
  }
}
