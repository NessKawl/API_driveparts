import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // A propriedade correta é 'id' (conforme sua JwtStrategy)
        if (data) {
            return user[data];
        }
        return user;
    },
);