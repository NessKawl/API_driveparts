import { Controller, Get, Patch, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('reservas/listarTodas')
  async listarTodas() {
    return this.dashboardService.listarTodasReservas();
  }

  @Get('reservas/reservasAtivas')
  async reservasAtivas() {
    return this.dashboardService.reservasAtivas();
  }

  @Get("vendas/ultimos30Dias")
  async ultimas30Dias() {
    return this.dashboardService.vendasUltimos30Dias();
  }

  @Get('vendas/listarTodas')
  async listarTodasVendas() {
    return this.dashboardService.listarTodasVendas();
  }

  @Get('vendas/vendasPorPagamento')
  async getVendasPorPagamento() {
    return this.dashboardService.getVendasPorPagamento();
  }

  @Get('caixa/movimentacoes')
  getMovimentacoes() {
    return this.dashboardService.getMovimentacoes();
  }

  @Get('caixa/caixaAtual')
  async getCaixaAtual() {
    const caixa = await this.dashboardService.getCaixaAtual();
    return { caixa };
  }

  @Patch('reservas/:ven_id/status')
  async atualizarStatusDashboard(
    @AuthUser('id') usu_id: number,
    @Param('ven_id', ParseIntPipe) ven_id: number,
    @Body('status') status: 'CANCELADA',
  ) {
    return this.dashboardService.atualizarStatusDashboard(ven_id, status, usu_id);
  }
}
