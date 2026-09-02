import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { ShortCodeModule } from '../short-code/short-code.module';
import { PrismaModule } from '../prismaClient/prisma.module';

@Module({
  imports: [ShortCodeModule, PrismaModule],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
