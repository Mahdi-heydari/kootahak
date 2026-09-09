import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { RequestMethod, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import helmet from "helmet";
import type { Express } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const isProduction = process.env.NODE_ENV === "production";

  app.useLogger(app.get(Logger));

  // --- Security middleware (must run before routing) ---
  app.use(helmet());
  app.use(cookieParser());
  const expressInstance = app.getHttpAdapter().getInstance() as Express;
  // Don't advertise the framework to clients.
  expressInstance.disable("x-powered-by");
  // Trust the first proxy hop (nginx) so req.ip is the real client IP used by the rate limiter.
  expressInstance.set("trust proxy", 1);

  app.enableCors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  });

  // --- Routing ---
  // The redirect entrypoint (`GET /:shortCode`, RedirectController) must live at
  // the root so short links stay short — keep it out of the global `api` prefix.
  app.setGlobalPrefix("api", {
    exclude: [{ path: ":shortCode", method: RequestMethod.GET }],
  });

  // --- Validation ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: isProduction,
    }),
  );

  // --- API docs ---
  // Swagger exposes the full API surface (every route, DTO, validation rule),
  // so it must not be reachable in production.
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle("API")
      .setDescription("API docs")
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
