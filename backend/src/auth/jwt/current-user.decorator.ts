import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { CurrentUserShape } from "./jwt.strategy";

type RequestWithUser = Request & { user: CurrentUserShape };

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): CurrentUserShape => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
