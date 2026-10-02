import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { ThrottlerModule, ThrottlerModuleOptions } from "@nestjs/throttler";
import { Request } from "express";
import { Redis } from "ioredis";
import { RedisModule } from "./redis.module";
import { REDIS_CLIENT } from "./redis.constants";

export const throttlerConfig = ThrottlerModule.forRootAsync({
  imports: [RedisModule],
  useFactory: (redis: Redis): ThrottlerModuleOptions => {
    return {
      throttlers: [{ name: "default", ttl: 60000, limit: 60 }],
      storage: new ThrottlerStorageRedisService(redis),
      getTracker: (req: Request): string => req.ip ?? "unknown",
    };
  },
  inject: [REDIS_CLIENT],
});
