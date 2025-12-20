import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';

@Controller('commissions')
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Post()
  upsert(@Body() dto: CreateCommissionDto) {
    return this.commissionsService.upsert(dto);
  }

  @Get('client/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.commissionsService.findByClient(Number(clientId));
  }
}
