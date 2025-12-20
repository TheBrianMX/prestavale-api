import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule],
})
export class PaymentsModule {}
