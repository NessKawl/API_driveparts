import { Controller, Post, Body, UseGuards, BadRequestException, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { ParseIntPipe } from '@nestjs/common';
import { AdicionarItemDto } from './dto/adicionar-item.dto';
import { FinalizarVendaDto } from './dto/finalizar-venda.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Get('busca')
  buscar(@Query('termo') termo: string) {
    return this.reservaService.buscarReservaProduto(termo);
  }

  @Get(':id')
  buscarReservaPorId(@Param('id') id: string) {
    return this.reservaService.buscarReservaPorId(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('adicionarItem')
  async adicionarItem(
    @AuthUser('id') usu_id: number,
    @Body() dto: AdicionarItemDto,
  ) {
    return this.reservaService.adicionarItem(usu_id, dto); 
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':ven_id/finalizar')
  async finalizarVenda(
    @AuthUser('id') usu_id: number,
    @Param('ven_id', ParseIntPipe) ven_id: number,
    @Body() dto: FinalizarVendaDto,
  ) {
    return this.reservaService.finalizarVenda(ven_id, usu_id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':ven_id/item/:pro_id')
  removerItem(
    @AuthUser('id') usu_id: number,
    @Param('ven_id', ParseIntPipe) ven_id: number,
    @Param('pro_id', ParseIntPipe) pro_id: number
  ) {
    return this.reservaService.removerItem(usu_id, ven_id, pro_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReserva(
    @AuthUser('id') usu_id: number,
    @Body() dto: CreateReservaDto
  ) {
    if (!usu_id) {
      throw new BadRequestException('Usuário inválido ou não autenticado.');
    }

    return this.reservaService.createReserva(usu_id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':ven_id/status')
  async atualizarStatus(
    @AuthUser('id') usu_id: number,
    @Param('ven_id', ParseIntPipe) ven_id: number,
    @Body('status') status: 'CANCELADA'
  ) {
    return this.reservaService.atualizarStatusReserva(ven_id, status, usu_id);
  }



}
