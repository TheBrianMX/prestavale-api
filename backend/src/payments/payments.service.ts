import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    if (!dto.voucherId || dto.voucherId <= 0) {
      throw new BadRequestException('voucherId inválido');
    }

    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('amount debe ser mayor a 0');
    }

    const voucher = await this.prisma.voucher.findUnique({
      where: { id: dto.voucherId },
      include: { payments: true, client: true },
    });

    if (!voucher) {
      throw new NotFoundException('Vale no encontrado');
    }

    if (voucher.status === 'PAID') {
      throw new BadRequestException('El vale ya está pagado');
    }

    let newBalance = Number(voucher.balance) - dto.amount;

    if (newBalance < 0) {
      if (dto.overpayment === 'CREDIT') {
        const extra = Math.abs(newBalance);

        await this.prisma.client.update({
          where: { id: voucher.clientId },
          data: {
            creditBalance: {
              increment: extra,
            },
          },
        });

        newBalance = 0;
      } else {
        newBalance = 0;
      }
    }


    let appliedPercent: number | null = null;
    let commissionAmount: number | null = null;
    let payableAmount = voucher.payableAmount
      ? Number(voucher.payableAmount)
      : Number(voucher.totalAmount);

    // Si con este pago se liquida el vale
    if (newBalance === 0) {
      const paymentDay = new Date().getDate();

      const commissions = await this.prisma.clientCommission.findMany({
        where: { clientId: voucher.clientId },
      });

      if (!commissions.length) {
        throw new BadRequestException('El cliente no tiene comisiones configuradas');
      }

      if (paymentDay < 15) {
        appliedPercent = Math.max(...commissions.map(c => Number(c.percent)));
      } else {
        const exactDay = commissions.find(c => c.day === paymentDay);
        appliedPercent = exactDay
          ? Number(exactDay.percent)
          : Math.max(...commissions.map(c => Number(c.percent)));
      }

      commissionAmount =
        Number(voucher.totalAmount) * (appliedPercent / 100);

      payableAmount =
        Number(voucher.totalAmount) - commissionAmount;

      newBalance = 0;
    }

    const payment = await this.prisma.payment.create({
      data: {
        voucherId: voucher.id,
        amount: dto.amount,
        appliedCommissionPercent: appliedPercent,
        commissionAmount,
      },
    });

    await this.prisma.voucher.update({
      where: { id: voucher.id },
      data: {
        balance: newBalance,
        payableAmount,
        status: newBalance === 0 ? 'PAID' : 'ACTIVE',
      },
    });

    return payment;
  }
}
