import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client";

import { getDatabaseUrl } from "../config/database-url";

@Injectable()
export class PrismaService
  extends PrismaClient<{
    adapter: PrismaPg;
    log: (Prisma.LogLevel | Prisma.LogDefinition)[];
  }>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: getDatabaseUrl(),
    });

    const log: Prisma.LogDefinition[] = [
      { emit: "event", level: "error" },
      { emit: "event", level: "warn" },
    ];

    if (process.env.NODE_ENV !== "production") {
      log.push({ emit: "event", level: "query" });
    }

    super({ adapter, log });
  }

  async onModuleInit() {
    this.$on("error", (event) => {
      this.logger.error(`Prisma error: ${event.message}`);
    });

    this.$on("warn", (event) => {
      this.logger.warn(`Prisma warning: ${event.message}`);
    });

    if (process.env.NODE_ENV !== "production") {
      this.$on("query", (event) => {
        this.logger.debug(`${event.duration}ms | ${event.query}`);
      });
    }

    await this.$connect();
    this.logger.log("Prisma connected to database");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Prisma disconnected from database");
  }
}
