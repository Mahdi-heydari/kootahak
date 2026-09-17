import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsSafeRedirectUrl } from "../validators/is-safe-redirect-url.validator";

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
    description:
      "URL to shorten. Must use http:// or https://, no username/password in " +
      "the URL, and no localhost/private/internal addresses.",
    example: "https://myShop.com/myProduct",
    maxLength: 2048,
  })
  @IsNotEmpty({ message: "لینک ورودی الزامی است" })
  @IsUrl(
    { require_protocol: true },
    { message: "لینک باید با http:// یا https:// شروع شود" },
  )
  @IsSafeRedirectUrl()
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

export class SetPinLinkDto {
  @ApiProperty({
    description: "Id of the link to pin/unpin",
    example: 1,
  })
  @IsNotEmpty({ message: "شناسه لینک الزامی است" })
  @IsInt({ message: "شناسه لینک باید عدد صحیح باشد" })
  @IsPositive({ message: "شناسه لینک نامعتبر است" })
  linkId: number;

  @ApiProperty({
    description: "Whether the link should be pinned",
    example: true,
  })
  @IsNotEmpty({ message: "وضعیت پین الزامی است" })
  @IsBoolean({ message: "وضعیت پین باید مقدار درست یا نادرست باشد" })
  isPin: boolean;
}

export class SetActiveLinkDto {
  @ApiProperty({
    description: "Id of the link to activate/deactivate",
    example: 1,
  })
  @IsNotEmpty({ message: "شناسه لینک الزامی است" })
  @IsInt({ message: "شناسه لینک باید عدد صحیح باشد" })
  @IsPositive({ message: "شناسه لینک نامعتبر است" })
  linkId: number;

  @ApiProperty({
    description: "Whether the link should be active",
    example: true,
  })
  @IsNotEmpty({ message: "وضعیت فعال بودن الزامی است" })
  @IsBoolean({ message: "وضعیت فعال بودن باید مقدار درست یا نادرست باشد" })
  isActive: boolean;
}

export class getLinkDto {
  @ApiProperty({
    description: "short code",
    example: "user short code",
  })
  @IsNotEmpty({ message: "کد کوتاه الزامی است" })
  @IsString({ message: "کد کوتاه باید متن باشد" })
  @Matches(/^[A-Za-z0-9_-]{4,20}$/, { message: "کد کوتاه نامعتبر است" })
  shortCode: string;
}
