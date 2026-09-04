import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export type VisitContext = {
  ip: string;
  userAgent: string;
  referer: string;
};

export type CachedLink = {
  id: number;
  originalUrl: string;
};
export class CreateLinkDto {
  @ApiProperty({
    description: "User original URL to be shortened",
    example: "https://myShop.com/myProduct",
  })
  @IsNotEmpty({ message: "لینک ورودی الزامی است" })
  @IsUrl(
    { require_protocol: true },
    { message: "لینک باید با http:// یا https:// شروع شود" },
  )
  originalUrl: string;

  @ApiPropertyOptional({
    description: "User suggested code for shortening",
    example: "xc2z9",
    minLength: 4,
    maxLength: 20,
  })
  @IsOptional()
  @IsString({ message: "کد پیشنهادی باید متن باشد" })
  @MinLength(4, { message: "کد پیشنهادی باید حداقل 4 کاراکتر باشد" })
  @MaxLength(20, { message: "کد پیشنهادی باید حداکثر 20 کاراکتر باشد" })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: "کد پیشنهادی فقط می‌تواند شامل حروف، عدد، خط تیره و آندرلاین باشد",
  })
  suggestedCode?: string;

  @ApiProperty({
    description: "Title for the shortened link",
    example: "My Shop Product Page",
    maxLength: 255,
  })
  @IsNotEmpty({ message: "عنوان الزامی است" })
  @IsString({ message: "عنوان باید متن باشد" })
  @MaxLength(255, { message: "عنوان باید حداکثر 255 کاراکتر باشد" })
  title: string;

  @ApiPropertyOptional({
    description: "Link expiration date/time (ISO 8601)",
    example: "2026-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsDateString({}, { message: "تاریخ انقضا باید در قالب معتبر تاریخ باشد" })
  expiresAt?: string;
}

export class getLinkDto {
  @ApiProperty({
    description: "short code",
    example: "user short code",
  })
  @IsNotEmpty({ message: "کد کوتاه الزامی است" })
  @IsString({ message: "کد کوتاه باید متن باشد" })
  shortCode: string;
}
