import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserLogin = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string | null => {
        const req = ctx.switchToHttp().getRequest();
        return req.user?.login ? String(req.user.login) : null
    }
)