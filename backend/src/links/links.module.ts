import { Module } from "@nestjs/common";
import { LinksController } from "./links.controller";
import { RedirectController } from "./redirect.controller";
import { LinksService } from "./links.service";
import { ShortCodeModule } from "../short-code/short-code.module";
import { PrismaModule } from "../prismaClient/prisma.module";
import { RedisModule } from "../redis/redis.module";
import { BullMqModule } from "../bullmq/bullMq.module";

@Module({
  imports: [ShortCodeModule, PrismaModule, RedisModule, BullMqModule],
  controllers: [LinksController, RedirectController],
  providers: [LinksService],
})
export class LinksModule {}
