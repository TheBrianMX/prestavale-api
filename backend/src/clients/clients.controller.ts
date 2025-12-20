import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('ping')
  ping() {
    return { message: 'clients ok' };
  }

  @Get()
  getAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.clientsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.clientsService.create(body.name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.clientsService.update(Number(id), body.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(Number(id));
  }
}
