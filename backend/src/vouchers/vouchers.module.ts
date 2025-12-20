import { Module } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VouchersController],
  providers: [VouchersService],
  imports: [PrismaModule],
})
export class VouchersModule {}
