import { ConfigService } from "@nestjs/config";
import { REDIS_CLIENT } from "./redis.constants";
import { Redis } from "ioredis";

export const redisProvider = {
  provide: REDIS_CLIENT,
  useFactory: (configService: ConfigService) => {
    return new Redis({
      host: configService.get<string>("REDIS_HOST"),
      port: Number(configService.get<string>("REDIS_PORT")),
    });
  },

  inject: [ConfigService],
};
