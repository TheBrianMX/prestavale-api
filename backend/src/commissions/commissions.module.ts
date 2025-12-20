import { Module } from '@nestjs/common';
import { CommissionsController } from './commissions.controller';
import { CommissionsService } from './commissions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CommissionsController],
  providers: [CommissionsService],
  imports: [PrismaModule],
})
export class CommissionsModule {}
