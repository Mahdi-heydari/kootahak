import { ConfigService } from "@nestjs/config";
import { GEOLOCATION_CLIENT } from "./geolocation.constants";
import { IpGeolocationClient } from "ip-geolocation-api-sdk-typescript";

export const geolocationProvider = {
  provide: GEOLOCATION_CLIENT,
  useFactory: (configService: ConfigService) => {
    return new IpGeolocationClient({
      apiKey: configService.get<string>("GEOLOCATION_TOKEN"),
    });
  },

  inject: [ConfigService],
};
