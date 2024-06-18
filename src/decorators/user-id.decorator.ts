import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string | null => {
        const req = ctx.switchToHttp().getRequest();
        return req.user?.sub ? String(req.user.sub) : null
    }
)