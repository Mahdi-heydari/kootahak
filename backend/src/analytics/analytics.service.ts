import { Injectable, NotFoundException } from "@nestjs/common";
import { toJalaali } from "jalaali-js";
import { getJalaliMonthRange } from "../common/helper";
import { User } from "../generated/prisma/client";
import { PrismaService } from "../prismaClient/prisma.service";

type AuthorInfo = Pick<User, "id" | "name" | "email">;

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getHourlyVisits(linkId: number, user: AuthorInfo) {
    await this.checkLinkOwner(linkId, user);

    const start = new Date();
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() - 23);

    const visitCountByHour = new Map<
      number,
      { id: number; value: string; count: number }
    >();
    for (let i = 0; i < 24; i++) {
      const hour = (start.getHours() + i) % 24;
      visitCountByHour.set(hour, {
        id: i + 1,
        value: `${hour}:00`,
        count: 0,
      });
    }

    const visits = await this.prisma.visit.findMany({
      where: { linkId, visitedAt: { gte: start } },
      select: { visitedAt: true },
    });

    visits.forEach((visit) => {
      const hour = visitCountByHour.get(visit.visitedAt.getHours());
      if (!hour) return;

      hour.count += 1;
    });

    return Array.from(visitCountByHour.values());
  }

  async getDailyVisits(linkId: number, user: AuthorInfo) {
    await this.checkLinkOwner(linkId, user);

    const { jalaliMonthLength, startOfMonth, endOfMonth } =
      getJalaliMonthRange();

    const visitCountByDay = new Map<
      number,
      { id: number; value: string; count: number }
    >();
    for (let i = 0; i < jalaliMonthLength; i++) {
      visitCountByDay.set(i + 1, {
        id: i + 1,
        value: `روز ${i + 1}`,
        count: 0,
      });
    }

    const visits = await this.prisma.visit.findMany({
      where: { linkId, visitedAt: { gte: startOfMonth, lte: endOfMonth } },
      select: { visitedAt: true },
    });

    visits.forEach((visit) => {
      const { jd } = toJalaali(visit.visitedAt);
      const day = visitCountByDay.get(jd);
      if (!day) return;

      day.count += 1;
    });

    return Array.from(visitCountByDay.values());
  }

  async getWeeklyVisits(linkId: number, user: AuthorInfo) {
    await this.checkLinkOwner(linkId, user);

    const { startOfMonth, endOfMonth } = getJalaliMonthRange();

    const visitCountByWeek = new Map<
      number,
      { id: number; value: string; count: number }
    >();
    for (let i = 0; i < 4; i++) {
      visitCountByWeek.set(i + 1, {
        id: i + 1,
        value: `هفته ${i + 1}`,
        count: 0,
      });
    }

    const visits = await this.prisma.visit.findMany({
      where: { linkId, visitedAt: { gte: startOfMonth, lte: endOfMonth } },
      select: { visitedAt: true },
    });

    visits.forEach((visit) => {
      const { jd } = toJalaali(visit.visitedAt);
      // days 29-31 fold into the 4th week
      const week = visitCountByWeek.get(Math.min(Math.ceil(jd / 7), 4));
      if (!week) return;

      week.count += 1;
    });

    return Array.from(visitCountByWeek.values());
  }

  async getBrowserVisits(linkId: number, user: AuthorInfo) {
    await this.checkLinkOwner(linkId, user);

    const browsers = await this.prisma.visit.groupBy({
      by: ["browser"],
      where: { linkId },
      _count: { _all: true },
    });

    return browsers
      .map((b) => ({ name: b.browser ?? "unknown", count: b._count._all }))
      .sort((a, b) => b.count - a.count);
  }

  async getDeviceVisits(linkId: number, user: AuthorInfo) {
    await this.checkLinkOwner(linkId, user);

    const devices = await this.prisma.visit.groupBy({
      by: ["device"],
      where: { linkId },
      _count: { _all: true },
    });

    return devices
      .map((d) => ({ name: d.device ?? "unknown", count: d._count._all }))
      .sort((a, b) => b.count - a.count);
  }

  private async checkLinkOwner(linkId: number, user: AuthorInfo) {
    const link = await this.prisma.link.findFirst({
      where: { id: linkId, authorId: user.id, deletedAt: null },
      select: { id: true },
    });

    if (!link) {
      throw new NotFoundException("لینک شما نامعتبر است.");
    }
  }
}
