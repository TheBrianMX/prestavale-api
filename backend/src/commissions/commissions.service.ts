import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommissionDto } from './dto/create-commission.dto';

@Injectable()
export class CommissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(dto: CreateCommissionDto) {
    if (!dto.clientId || dto.clientId <= 0) {
      throw new BadRequestException('clientId inválido');
    }
    if (!Number.isInteger(dto.day) || dto.day < 1 || dto.day > 31) {
      throw new BadRequestException('day debe ser entero entre 1 y 31');
    }
    if (dto.percent === undefined || dto.percent === null || dto.percent <= 0) {
      throw new BadRequestException('percent debe ser mayor a 0');
    }

    const client = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // Evita duplicados: si existe (clientId, day) lo actualiza; si no, lo crea
    return this.prisma.clientCommission.upsert({
      where: {
        clientId_day: {
          clientId: dto.clientId,
          day: dto.day,
        },
      },
      update: {
        percent: dto.percent,
      },
      create: {
        clientId: dto.clientId,
        day: dto.day,
        percent: dto.percent,
      },
    });
  }

  async findByClient(clientId: number) {
    if (!clientId || clientId <= 0) {
      throw new BadRequestException('clientId inválido');
    }

    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return this.prisma.clientCommission.findMany({
      where: { clientId },
      orderBy: { day: 'asc' },
    });
  }
}
