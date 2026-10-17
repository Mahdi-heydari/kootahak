import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { CurrentUser } from "../auth/jwt/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import type { User } from "../generated/prisma/client";
import { AnalyticsService } from "./analytics.service";

@ApiTags("analytics")
@ApiBearerAuth()
@ApiBadRequestResponse({ description: "Invalid linkId" })
@ApiUnauthorizedResponse({ description: "Missing or invalid authentication" })
@ApiNotFoundResponse({
  description:
    "No link with this id exists, it was deleted, or it belongs to another user",
})
@UseGuards(JwtAuthGuard)
@Throttle({ default: { limit: 30, ttl: 60000 } })
@Controller("api/links/:linkId/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("hourly")
  @ApiOperation({ summary: "Visits per hour over the last 24 hours" })
  @ApiOkResponse({
    description: "24 hourly buckets { id, value, count }, oldest first",
  })
  async getHourlyVisits(
    @Param("linkId", ParseIntPipe) linkId: number,
    @CurrentUser() user: Pick<User, "id" | "name" | "email">,
  ) {
    return await this.analyticsService.getHourlyVisits(linkId, user);
  }

  @Get("daily")
  @ApiOperation({ summary: "Visits per day of the current Jalali month" })
  @ApiOkResponse({
    description: "One bucket { id, value, count } per day of the Jalali month",
  })
  async getDailyVisits(
    @Param("linkId", ParseIntPipe) linkId: number,
    @CurrentUser() user: Pick<User, "id" | "name" | "email">,
  ) {
    return await this.analyticsService.getDailyVisits(linkId, user);
  }

  @Get("weekly")
  @ApiOperation({ summary: "Visits per week of the current Jalali month" })
  @ApiOkResponse({
    description:
      "4 weekly buckets { id, value, count } (days 1-7, 8-14, 15-21, 22-end)",
  })
  async getWeeklyVisits(
    @Param("linkId", ParseIntPipe) linkId: number,
    @CurrentUser() user: Pick<User, "id" | "name" | "email">,
  ) {
    return await this.analyticsService.getWeeklyVisits(linkId, user);
  }

  @Get("browsers")
  @ApiOperation({ summary: "All-time visit count per browser" })
  @ApiOkResponse({ description: "{ name, count }[] sorted by count desc" })
  async getBrowserVisits(
    @Param("linkId", ParseIntPipe) linkId: number,
    @CurrentUser() user: Pick<User, "id" | "name" | "email">,
  ) {
    return await this.analyticsService.getBrowserVisits(linkId, user);
  }

  @Get("devices")
  @ApiOperation({ summary: "All-time visit count per device type" })
  @ApiOkResponse({ description: "{ name, count }[] sorted by count desc" })
  async getDeviceVisits(
    @Param("linkId", ParseIntPipe) linkId: number,
    @CurrentUser() user: Pick<User, "id" | "name" | "email">,
  ) {
    return await this.analyticsService.getDeviceVisits(linkId, user);
  }
}
