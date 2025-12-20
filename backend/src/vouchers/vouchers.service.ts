import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Injectable()
export class VouchersService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateDueDate(baseDate: Date): Date {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth(); // 0-11
    const day = baseDate.getDate();

    // si se genera del 1 al 14 -> 15 del mismo mes
    if (day >= 1 && day <= 14) {
      return new Date(year, month, 15, 0, 0, 0, 0);
    }

    // si se genera del 15 al último -> 15 del siguiente mes
    return new Date(year, month + 1, 15, 0, 0, 0, 0);
  }

  async create(dto: CreateVoucherDto) {
    if (!dto.clientId || dto.clientId <= 0) {
      throw new BadRequestException('clientId inválido');
    }
    if (!dto.totalAmount || dto.totalAmount <= 0) {
      throw new BadRequestException('totalAmount debe ser mayor a 0');
    }

    const client = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const now = new Date();
    const dueDate = this.calculateDueDate(now);

    return this.prisma.voucher.create({
      data: {
        clientId: dto.clientId,
        totalAmount: dto.totalAmount,
        balance: dto.totalAmount,
        dueDate,
        // status: ACTIVE por default
      },
      include: {
        client: true,
        payments: true,
      },
    });
  }

  async findAll(clientId?: number) {
    return this.prisma.voucher.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { client: true, payments: true },
    });
  }

  async findOne(id: number) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
      include: { client: true, payments: true },
    });

    if (!voucher) {
      throw new NotFoundException('Vale no encontrado');
    }

    return voucher;
  }
}
