import { Controller, Get, Param, Redirect } from "@nestjs/common";
import {
  ApiExcludeController,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { LinksService } from "./links.service";
import { getLinkDto } from "./dto";

/**
 * Public redirect entrypoint for short links.
 *
 * Mounted at the application root (`GET /:shortCode`), outside the global `api`
 * prefix (see `main.ts`), so a short link is genuinely short: `domain.com/abc123`.
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
  async redirect(@Param("shortCode") shortCode: string) {
    const getData: getLinkDto = { shortCode };
    const originalUrl = await this.linksService.visitLink(getData);

    return { url: originalUrl, statusCode: 302 };
  }
}
