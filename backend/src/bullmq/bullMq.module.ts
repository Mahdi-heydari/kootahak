import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { bullMQProvider } from "./bullMq.provider";
import { visitWorker } from "./visitWorker.provider";
import { VISIT_QUEUE } from "./bullMq.constant";
import { VisitsModule } from "../visits/visits.module";

@Module({
  imports: [VisitsModule, LoggerModule],
  providers: [bullMQProvider, visitWorker],
  exports: [VISIT_QUEUE],
})
export class BullMqModule {}
