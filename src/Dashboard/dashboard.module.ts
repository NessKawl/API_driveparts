import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaService } from 'src/prisma.service';
import { ReservaService } from 'src/Reserva/reserva.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, ReservaService, PrismaService],
})
export class DashboardModule {}
