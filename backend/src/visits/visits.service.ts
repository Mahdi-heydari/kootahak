import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  IpGeolocationClient,
  type LookupIpGeolocationRequestInit,
} from "ip-geolocation-api-sdk-typescript";
import { UAParser } from "ua-parser-js";
import { SourceType } from "../generated/prisma/enums";
import { CachedLink, VisitContext } from "../links/dto";
import { PrismaService } from "../prismaClient/prisma.service";
import { GEOLOCATION_CLIENT } from "./geolocation.constants";

export type VisitData = VisitContext & CachedLink;

@Injectable()
export class VisitsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    @Inject(GEOLOCATION_CLIENT)
    private readonly GEOService: IpGeolocationClient,
  ) {}

  private getSourceType(referer: string | undefined): SourceType {
    if (!referer) {
      return "DIRECT";
    }

    const searchEngines = ["google", "bing", "yahoo", "duckduckgo"];
    const socialSites = [
      "twitter",
      "x.com",
      "facebook",
      "instagram",
      "linkedin",
    ];

    if (searchEngines.some((engine) => referer.includes(engine))) {
      return "SEARCH";
    }

    if (socialSites.some((site) => referer.includes(site))) {
      return "SOCIAL";
    }

    return "OTHER";
  }

  private async getIPInfo(ip: string) {
    // Locally the visitor IP is a bogon (127.0.0.1) which the geo-IP API rejects
    // with HTTP 423. Outside production, look up a routable IP instead so the
    // pipeline can be tested end to end.
    const isProd = process.env.NODE_ENV === "production";
    const fallbackIp = this.config.get<string>("GEO_FALLBACK_IP") ?? "8.8.8.8";

    const request: LookupIpGeolocationRequestInit = {
      ip: isProd ? ip : fallbackIp,
    };

    const response = await this.GEOService.lookupIpGeolocation(request);
    return response.data;
  }

  async visitProcess(data: VisitData) {
    const referInfo = this.getSourceType(data.referer);
    const ipInfo = await this.getIPInfo(data.ip);
    const { browser, device } = UAParser(data.userAgent);

    const createdVisit = await this.prisma.visit.create({
      data: {
        linkId: data.id,
        country: ipInfo.location?.countryCode2,
        city: ipInfo.location?.city,
        source: referInfo,
        ipAddress: ipInfo.ip,
        browser: browser.name,
        device: device.type,
      },
    });

    return createdVisit;
  }
}
