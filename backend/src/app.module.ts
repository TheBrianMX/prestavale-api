import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from './prisma/prisma.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { CommissionsModule } from './commissions/commissions.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule,
    VouchersModule,
    CommissionsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
