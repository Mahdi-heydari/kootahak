import { Body, Controller, Post, Res } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import type { Response } from "express";

@Throttle({ default: { limit: 5, ttl: 60000 } })
@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, data } = await this.authService.register(body);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
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

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: "login successful",
      data,
    };
  }
}
