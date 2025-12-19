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

  update(id: number, name: string): Client | undefined {
    const client = this.findOne(id);
    if (!client) return undefined;
    client.name = name;
    return client;
  }

  remove(id: number): boolean {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.clients.splice(index, 1);
    return true;
  }
}
