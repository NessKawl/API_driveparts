import { Controller, Get, Patch, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { DashboardReservaService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('dashboard/reservas')
@UseGuards(JwtAuthGuard)
export class DashboardReservaController {
  constructor(private readonly dashboardReservaService: DashboardReservaService) {}

  @Get()
  async listarTodas() {
    return this.dashboardReservaService.listarTodasReservas();
  }

  @Patch(':ven_id/status')
  async atualizarStatusDashboard(
    @AuthUser('id') usu_id: number,
    @Param('ven_id', ParseIntPipe) ven_id: number,
    @Body('status') status: 'CANCELADA',
  ) {
    return this.dashboardReservaService.atualizarStatusAdmin(ven_id, status, usu_id);
  }
}
