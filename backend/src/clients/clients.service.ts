import { Injectable } from '@nestjs/common';
import type { Client } from './client.type';

@Injectable()
export class ClientsService {
  private clients: Client[] = [];

  findAll(): Client[] {
    return this.clients;
  }

  findOne(id: number): Client | undefined {
    return this.clients.find((c) => c.id === id);
  }

  create(name: string): Client {
    const newClient: Client = { id: this.clients.length + 1, name };
    this.clients.push(newClient);
    return newClient;
  }
}
