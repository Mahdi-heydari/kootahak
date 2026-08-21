import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "../../prismaClient/prisma.service";

type JwtPayload = {
  sub: number;
  email: string;
};

interface RequestWithCookie extends Request {
  cookies: {
    token?: string;
  };
}

const cookieExtractor = (req: RequestWithCookie): string | null => {
  return req.cookies.token ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
