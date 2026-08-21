import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../../generated/prisma/client";

type CurrentUserShape = Pick<User, "id" | "name" | "email">;
type RequestWithUser = Request & { user: CurrentUserShape };

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): CurrentUserShape => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
