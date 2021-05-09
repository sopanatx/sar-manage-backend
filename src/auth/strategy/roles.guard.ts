import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = GqlExecutionContext.create(context).getContext(); // ดึง Request จาก Header
    const user = request.user; // ดึงข้อมูล User
    if (roles.find((item) => item === user.role)) {
      //หาว่า Role ของ user มีใน @Roles ที่อนุญาตไหม
      return true;
    }
    throw new UnauthorizedException('Role Not Acceptable');
  }
}
