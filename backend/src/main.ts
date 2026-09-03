import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { RequestMethod, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  // The redirect entrypoint (`GET /:shortCode`, RedirectController) must live at
  // the root so short links stay short — keep it out of the global `api` prefix.
  app.setGlobalPrefix("api", {
    exclude: [{ path: ":shortCode", method: RequestMethod.GET }],
  });

  app.enableCors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API docs")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
