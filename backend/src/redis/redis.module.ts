import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { redisProvider } from "./redis.provider";
import { REDIS_CLIENT } from "./redis.constants";

@Module({
  providers: [RedisService, redisProvider],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
