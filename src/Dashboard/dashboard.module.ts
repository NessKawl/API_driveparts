import { Module } from '@nestjs/common';
import { DashboardReservaController } from './dashboard.controller';
import { DashboardReservaService } from './dashboard.service';
import { PrismaService } from 'src/prisma.service';
import { ReservaService } from 'src/Reserva/reserva.service';

@Module({
  controllers: [DashboardReservaController],
  providers: [DashboardReservaService, ReservaService, PrismaService],
})
export class DashboardReservaModule {}
