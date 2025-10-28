import { Body, Controller, Patch, UseGuards, Req, Param, Get } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { UpdateUserDto } from './dto/updtade-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReservaService } from '../Reserva/reserva.service'; 
import { ReservaHistoricoDto } from '../Reserva/dto/reserva-historico.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@Controller('perfil')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PerfilController {
    constructor(private readonly perfilService: PerfilService, private readonly reservaService: ReservaService,) { }

    @UseGuards(JwtAuthGuard)
    @Patch('atualizar')
    async updatePerfil(@Req() req, @Body() dto: UpdateUserDto) {
        const idNumber = req.user.id;

        return this.perfilService.updatePerfil(
            idNumber, dto
        )
    }

    @Get('reservas/ativas')
    @UseGuards(JwtAuthGuard)
    async getReservasAtivas(@AuthUser('id') usuIdLogado: number): Promise<ReservaHistoricoDto[]> {
        return this.reservaService.findReservasAtivas(usuIdLogado);
    }

    @Get('reservas/geral')
    @UseGuards(JwtAuthGuard)
    async getHistoricoGeral(@AuthUser('id') usuIdLogado: number): Promise<ReservaHistoricoDto[]> {
        return this.reservaService.findHistoricoGeral(usuIdLogado);
    }

}
