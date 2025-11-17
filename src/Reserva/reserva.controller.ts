import { Controller, Post, Body, UseGuards, BadRequestException, Patch, Param } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { ParseIntPipe } from '@nestjs/common';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

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
