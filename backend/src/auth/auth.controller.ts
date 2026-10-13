import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import type { CookieOptions, Response } from "express";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { CurrentUser } from "./jwt/current-user.decorator";
import type { CurrentUserShape } from "./jwt/jwt.strategy";

const authCookieBase = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});

@ApiTags("auth")
@Throttle({ default: { limit: 5, ttl: 60000 } })
@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("initialData")
  @UseGuards(JwtAuthGuard)
  initialData(@CurrentUser() user: CurrentUserShape) {
    const userData = this.authService.initialData(user);

    return {
      message: "successful",
      data: userData,
    };
  }

  @Post("register")
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, data } = await this.authService.register(body);

    res.cookie("token", token, {
      ...authCookieBase(),
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: "login successful",
      data,
    };
  }

  @Post("login")
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, data } = await this.authService.login(body);

    res.cookie("token", token, {
      ...authCookieBase(),
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: "login successful",
      data,
    };
  }

  @Post("logout")
  @ApiOperation({ summary: "Log out by clearing the auth cookie" })
  @ApiOkResponse({ description: "The auth cookie was cleared" })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token", authCookieBase());

    return {
      message: "logout successful",
    };
  }
}
