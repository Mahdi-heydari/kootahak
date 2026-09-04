import { Module } from "@nestjs/common";
import { redisProvider } from "./redis.provider";
import { REDIS_CLIENT } from "./redis.constants";

@Module({
  providers: [redisProvider],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
