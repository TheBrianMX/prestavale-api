import { Controller, Get } from '@nestjs/common';

@Controller('clients')
export class ClientsController {
  @Get('ping')
  ping() {
    return { message: 'clients ok' };
  }
}
