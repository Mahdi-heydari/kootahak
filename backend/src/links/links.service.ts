import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateLinkDto } from "./dto";
import { PrismaService } from "../prismaClient/prisma.service";
import { Link, Prisma, User } from "../generated/prisma/client";
import { ShortCodeService } from "../short-code/short-code.service";

const MAX_GENERATION_ATTEMPTS = 5;
const UNIQUE_CONSTRAINT_ERROR_CODE = "P2002";

type AuthorInfo = Pick<User, "id">;
type LinkDataWithoutCode = Omit<Prisma.LinkCreateInput, "shortCode">;

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly shortCodeService: ShortCodeService,
  ) {}

  async createUserLink(
    createData: CreateLinkDto,
    author: AuthorInfo,
  ): Promise<Link> {
    const shortCode = createData.suggestedCode
      ? await this.reserveSuggestedCode(createData.suggestedCode)
      : undefined;

    const data = {
      author: { connect: { id: author.id } },
      originalUrl: createData.originalUrl,
      title: createData.title,
      expiresAt: createData.expiresAt,
    };

    if (shortCode) {
      return this.prisma.link.create({ data: { ...data, shortCode } });
    }

    return this.createWithGeneratedCode(data);
  }

  private async reserveSuggestedCode(suggestedCode: string): Promise<string> {
    const existingLink = await this.prisma.link.findUnique({
      where: { shortCode: suggestedCode },
      select: { id: true },
    });

    if (existingLink) {
      throw new ConflictException("این کد قبلا استفاده شده است");
    }

    return suggestedCode;
  }

  private async createWithGeneratedCode(
    data: LinkDataWithoutCode,
  ): Promise<Link> {
    const totalLinks = await this.prisma.link.count();
    const codeLength = this.calculateCodeLength(totalLinks);

    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
      const shortCode = this.shortCodeService.generate(codeLength);

      try {
        return await this.prisma.link.create({ data: { ...data, shortCode } });
      } catch (err) {
        if (this.isUniqueConstraintViolation(err)) {
          continue;
        }
        throw err;
      }
    }

    throw new InternalServerErrorException(
      "امکان ساخت کد کوتاه یکتا وجود نداشت، دوباره تلاش کنید",
    );
  }

  private calculateCodeLength(totalLinks: number): number {
    if (totalLinks < 1_000) return 4;
    if (totalLinks < 100_000) return 5;
    if (totalLinks < 5_000_000) return 6;
    return 7;
  }

  private isUniqueConstraintViolation(err: unknown): boolean {
    return (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === UNIQUE_CONSTRAINT_ERROR_CODE
    );
  }
}
