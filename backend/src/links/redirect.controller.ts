import { Controller, Get, Header, Param, Redirect, Req } from "@nestjs/common";
import {
  ApiExcludeController,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { LinksService } from "./links.service";
import { getLinkDto, VisitContext } from "./dto";
import type { Request } from "express";
import { Throttle } from "@nestjs/throttler";

/**
 * Public redirect entrypoint for short links.
 *
 * Mounted at the application root (`GET /:shortCode`). Every other controller in
 * this app declares its own `"api/..."` prefix explicitly on `@Controller()`
 * (see main.ts -- there is no global prefix anymore); this controller simply has
 * no prefix, so it stays at the root and a short link is genuinely short:
 * `domain.com/abc123`.
 * A visitor here is anonymous — this controller must never sit behind the JWT
 * guard.
 */
@ApiExcludeController()
@Controller()
export class RedirectController {
  constructor(private readonly linksService: LinksService) {}

  @Get(":shortCode")
  @Redirect()
  @ApiOperation({
    summary:
      "Resolve a short code and redirect the visitor to the original URL",
  })
  @ApiParam({ name: "shortCode", example: "abc123" })
  @ApiFoundResponse({ description: "Redirects (302) to the original URL" })
  @ApiNotFoundResponse({ description: "No link exists for this short code" })
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Header("Cache-Control", "no-store")
  async redirect(@Param() getData: getLinkDto, @Req() request: Request) {
    const visitContext: VisitContext = {
      ip: request.ip ?? "unknown",
      userAgent: request.headers["user-agent"] ?? "unknown",
      referer: request.headers["referer"] ?? "unknown",
    };

    const originalUrl = await this.linksService.visitLink(
      visitContext,
      getData,
    );

    return { url: originalUrl, statusCode: 302 };
  }
}
