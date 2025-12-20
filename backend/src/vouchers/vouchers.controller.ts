import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  create(@Body() dto: CreateVoucherDto) {
    return this.vouchersService.create(dto);
  }

  // opcional: /vouchers?clientId=1
  @Get()
  findAll(@Query('clientId') clientId?: string) {
    return this.vouchersService.findAll(clientId ? Number(clientId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vouchersService.findOne(Number(id));
  }
}
