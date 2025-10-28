import { Controller, Post, Body, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criarReserva(@Req() req, @Body() dto: CreateReservaDto) {
    const usu_id = req.user.id;

    if (typeof usu_id !== 'number') {
       throw new BadRequestException('Usuário inválido ou não autenticado.');
   }
   
   return this.reservaService.criarReserva(usu_id, dto);
 }
}
