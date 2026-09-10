import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { LinksService } from "./links.service";
import { CreateLinkDto } from "./dto";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { CurrentUser } from "../auth/jwt/current-user.decorator";
import type { User } from "../generated/prisma/client";

@ApiTags("links")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("links")
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: "Create a new shortened link for the current user" })
  @ApiCreatedResponse({ description: "The link was created successfully" })
  @ApiConflictResponse({
    description: "The suggested short code is already in use",
  })
  @ApiBadRequestResponse({
    description:
      "Invalid input, e.g. originalUrl is not http(s), has credentials in it, " +
      "or points to a localhost/private/internal address",
  })
  @ApiUnauthorizedResponse({ description: "Missing or invalid authentication" })
  createLink(
    @Body() createLinkDto: CreateLinkDto,
    @CurrentUser() user: Pick<User, "id" | "name" | "email">,
  ) {
    return this.linksService.createUserLink(createLinkDto, user);
  }
}
