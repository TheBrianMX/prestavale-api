import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany({ orderBy: { id: 'asc' } });
  }

  findOne(id: number) {
    return this.prisma.client.findUnique({ where: { id } });
  }

  create(name: string) {
    return this.prisma.client.create({ data: { name } });
  }

  update(id: number, name: string) {
    return this.prisma.client.update({ where: { id }, data: { name } });
  }

  remove(id: number) {
    return this.prisma.client.delete({ where: { id } });
  }
}