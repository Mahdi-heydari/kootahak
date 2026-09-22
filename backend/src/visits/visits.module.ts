import { Module } from "@nestjs/common";
import { VisitsService } from "./visits.service";
import { geolocationProvider } from "./geolocation.provider";
import { PrismaModule } from "../prismaClient/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [VisitsService, geolocationProvider],
  exports: [VisitsService],
})
export class VisitsModule {}
