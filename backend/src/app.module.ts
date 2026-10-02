import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prismaClient/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LinksModule } from "./links/links.module";
import { ShortCodeModule } from "./short-code/short-code.module";
import { RedisModule } from "./redis/redis.module";
import { BullMqModule } from "./bullmq/bullMq.module";
import { VisitsModule } from "./visits/visits.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { throttlerConfig } from "./redis/throttler.provider";
import { envValidationSchema } from "./common/config/env.validation";
import { AllExceptionsFilter } from "./common/all-exceptions.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
        transport:
          process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                  colorize: true,
                },
              }
            : undefined,
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    LinksModule,
    ShortCodeModule,
    RedisModule,
    BullMqModule,
    VisitsModule,
    throttlerConfig,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
