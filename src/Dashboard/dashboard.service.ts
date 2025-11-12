import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReservaService } from 'src/Reserva/reserva.service';

@Injectable()
export class DashboardReservaService {
    constructor(private readonly prisma: PrismaService, private readonly reservaService: ReservaService) { }

    async listarTodasReservas() {
        const reservas = await this.prisma.ven_venda.findMany({
            include: {
                usu_usuario: { select: { usu_nome: true, usu_tel: true } },
                ite_itemVenda: {
                    include: {
                        pro_produto: { select: { pro_nome: true, pro_valor: true, pro_marca: true } },
                    },
                },
            },
        });

        return reservas; 
    }


    async atualizarStatusAdmin(
        ven_id: number,
        status: 'CANCELADA',
        usu_id: number,
    ) {
        // reaproveita o método já existente
        return this.reservaService.atualizarStatusReserva(ven_id, status, usu_id);
    }
}
