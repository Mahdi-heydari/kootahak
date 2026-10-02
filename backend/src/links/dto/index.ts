import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
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

export enum LinkSortBy {
  CREATED_AT = "createdAt",
  EXPIRES_AT = "expiresAt",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export class PaginationDto {
  @ApiPropertyOptional({
    description: "Number of items per page",
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "limit باید عدد صحیح باشد" })
  @Min(1, { message: "limit باید حداقل 1 باشد" })
  @Max(50, { message: "limit باید حداکثر 50 باشد" })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: "Number of items to skip from the start of the list",
    example: 0,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "offset باید عدد صحیح باشد" })
  @Min(0, { message: "offset نمی‌تواند منفی باشد" })
  offset?: number = 0;
}

const toBoolean = ({ value }: { value: unknown }): unknown => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};

export class FilterDto {
  @ApiPropertyOptional({
    description: "Filter by whether the link is active",
    example: true,
  })
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean({ message: "isActive باید مقدار درست یا نادرست باشد" })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: "Filter by whether the link is pinned",
    example: true,
  })
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean({ message: "isPin باید مقدار درست یا نادرست باشد" })
  isPin?: boolean;

  @ApiPropertyOptional({
    description:
      "Filter by whether the link has expired (true: expired, " +
      "false: valid or unlimited)",
    example: false,
  })
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean({ message: "expired باید مقدار درست یا نادرست باشد" })
  expired?: boolean;
}

export class SearchDto {
  @ApiPropertyOptional({
    description: "Search in title and original URL",
    example: "myShop",
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: "search باید متن باشد" })
  @MaxLength(255, { message: "search باید حداکثر 255 کاراکتر باشد" })
  search?: string;
}

export class SortDto {
  @ApiPropertyOptional({
    description: "Field to sort by",
    enum: LinkSortBy,
    default: LinkSortBy.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(LinkSortBy, { message: "sortBy نامعتبر است" })
  sortBy?: LinkSortBy = LinkSortBy.CREATED_AT;

  @ApiPropertyOptional({
    description: "Sort direction",
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: "sortOrder نامعتبر است" })
  sortOrder?: SortOrder = SortOrder.DESC;
}

export class GetLinksQueryDto extends IntersectionType(
  PaginationDto,
  FilterDto,
  SortDto,
  SearchDto,
) {}

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

export class UpdateLinkDto {
  @ApiProperty({
    description: "Id of the link to update",
    example: 1,
  })
  @IsNotEmpty({ message: "شناسه لینک الزامی است" })
  @IsInt({ message: "شناسه لینک باید عدد صحیح باشد" })
  @IsPositive({ message: "شناسه لینک نامعتبر است" })
  linkId: number;

  @ApiPropertyOptional({
    description: "Title for the shortened link",
    example: "My Shop Product Page",
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty({ message: "عنوان نمی‌تواند خالی باشد" })
  @IsString({ message: "عنوان باید متن باشد" })
  @MaxLength(255, { message: "عنوان باید حداکثر 255 کاراکتر باشد" })
  title?: string;

  @ApiPropertyOptional({
    description: "New short code for the link",
    example: "xc2z9",
    minLength: 4,
    maxLength: 20,
  })
  @IsOptional()
  @IsString({ message: "کد کوتاه باید متن باشد" })
  @MinLength(4, { message: "کد کوتاه باید حداقل 4 کاراکتر باشد" })
  @MaxLength(20, { message: "کد کوتاه باید حداکثر 20 کاراکتر باشد" })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: "کد کوتاه فقط می‌تواند شامل حروف، عدد، خط تیره و آندرلاین باشد",
  })
  shortCode?: string;

  @ApiPropertyOptional({
    description:
      "URL to shorten. Must use http:// or https://, no username/password in " +
      "the URL, and no localhost/private/internal addresses.",
    example: "https://myShop.com/myProduct",
    maxLength: 2048,
  })
  @IsOptional()
  @IsNotEmpty({ message: "لینک ورودی نمی‌تواند خالی باشد" })
  @IsUrl(
    { require_protocol: true },
    { message: "لینک باید با http:// یا https:// شروع شود" },
  )
  @IsSafeRedirectUrl()
  originalUrl?: string;

  @ApiPropertyOptional({
    description: "Link expiration date/time (ISO 8601)",
    example: "2026-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsDateString({}, { message: "تاریخ انقضا باید در قالب معتبر تاریخ باشد" })
  expiresAt?: string;
}
