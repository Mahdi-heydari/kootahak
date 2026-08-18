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
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  readonly client: PrismaClient<"error" | "warn" | "query">;

  constructor() {
    const adapter = new PrismaPg({
      connectionString: getDatabaseUrl(),
    });

    const log: Prisma.LogDefinition[] = [
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "warn",
      },
    ];

    if (process.env.NODE_ENV !== "production") {
      log.push({
        emit: "event",
        level: "query",
      });
    }

    this.client = new PrismaClient({
      adapter,
      log,
    });
  }

  async onModuleInit() {
    this.client.$on("error", (event) => {
      this.logger.error(`Prisma error: ${event.message}`);
    });

    this.client.$on("warn", (event) => {
      this.logger.warn(`Prisma warning: ${event.message}`);
    });

    if (process.env.NODE_ENV !== "production") {
      this.client.$on("query", (event) => {
        this.logger.debug(`${event.duration}ms | ${event.query}`);
      });
    }

    await this.client.$connect();

    this.logger.log("Prisma connected to database");
  }

  async onModuleDestroy() {
    await this.client.$disconnect();

    this.logger.log("Prisma disconnected from database");
  }
}
