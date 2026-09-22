import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ThrottlerException } from "@nestjs/throttler";
import type { Response } from "express";
import { PinoLogger } from "nestjs-pino";
import { Prisma } from "../generated/prisma/client";

// Prisma error code -> HTTP status + a safe Persian message (no table/column names leaked).
const PRISMA_ERROR_STATUS: Record<string, { status: number; message: string }> =
  {
    P2002: {
      status: HttpStatus.CONFLICT,
      message: "این مقدار قبلا استفاده شده است.",
    },
    P2025: {
      status: HttpStatus.NOT_FOUND,
      message: "رکورد مورد نظر یافت نشد.",
    },
  };

// Catches every exception thrown anywhere in the app (not just HttpException).
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // Rate-limit hits are HttpExceptions too, so check this one first to override
    // their default English message with our Persian one.
    if (exception instanceof ThrottlerException) {
      response.status(HttpStatus.TOO_MANY_REQUESTS).json({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: "تعداد درخواست‌ها بیش از حد مجاز است. کمی صبر کنید.",
      });
      return;
    }

    // Exceptions we threw on purpose (e.g. ConflictException("...")) already carry
    // a safe Persian message, so pass them through unchanged.
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      response
        .status(status)
        .json(this.normalizeHttpExceptionBody(status, body));
      return;
    }

    // A raw Prisma error we didn't wrap ourselves -> map to a safe response instead
    // of letting Prisma's internal error message leak to the client.
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = PRISMA_ERROR_STATUS[exception.code];
      if (mapped) {
        response.status(mapped.status).json({
          statusCode: mapped.status,
          message: mapped.message,
        });
        return;
      }
    }

    // Anything else is unexpected: log full details server-side, tell the client nothing.
    this.logger.error({ err: exception }, "خطای پیش‌بینی‌نشده");
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "خطای داخلی سرور رخ داده است.",
    });
  }

  // HttpException's getResponse() can be a plain string or an object shape (like
  // class-validator's {message, error}); normalize both into one consistent body.
  private normalizeHttpExceptionBody(status: number, body: unknown) {
    if (typeof body === "object" && body !== null) {
      return { statusCode: status, ...body };
    }
    return { statusCode: status, message: body };
  }
}
