import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth.constants';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/user-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requredRoles) {
                return true
            }

            const request = context.switchToHttp().getRequest();
            // console.log(request.headers.authorization)
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }

            const user = this.jwtService.verify(token, { secret: jwtConstants.secret });
            request.user = user;
            if (!user) {
                throw new UnauthorizedException({ message: 'Нет доступа' })
            }
            return user.roles.some(role => requredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('Нет доступа', 403)
        }
    }
}