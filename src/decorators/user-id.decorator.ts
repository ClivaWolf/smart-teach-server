import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string | null => {
        const req = ctx.switchToHttp().getRequest();
        console.log('auth - ', req.user.login, req.user.sub)
        return req.user?.sub ? String(req.user.sub) : null
    }
)