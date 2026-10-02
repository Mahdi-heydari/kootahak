import { ConfigService } from "@nestjs/config";
import { VISIT_QUEUE } from "./bullMq.constant";
import { Queue } from "bullmq";

export const bullMQProvider = {
  provide: VISIT_QUEUE,
  useFactory: (configService: ConfigService) => {
    const visitQueue = new Queue("visit", {
      connection: {
        host: configService.get<string>("REDIS_HOST"),
        port: Number(configService.get<string>("REDIS_PORT")),
      },
    });

    return visitQueue;
  },

  inject: [ConfigService],
};
