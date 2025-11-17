import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReservaService } from 'src/Reserva/reserva.service';

@Injectable()
export class DashboardService {
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

    async reservasAtivas() {
        return this.prisma.ven_venda.count({
            where: {
                ven_status: "RESERVA", // ajuste conforme seu campo
            },
        });
    }

    async vendasUltimos30Dias() {
        const hoje = new Date();
        const data30diasAtras = new Date();
        data30diasAtras.setDate(hoje.getDate() - 30);

        return this.prisma.ven_venda.count({
            where: {
                ven_status: "CONCLUIDA",
                ven_data_criacao: {
                    gte: data30diasAtras,
                    lte: hoje,
                },
            },
        });
    }


    async getCaixaAtual(): Promise<number> {
        const movimentacoes = await this.prisma.mov_movimentacao_estoque.findMany({
            select: {
                mov_qtd: true,
                mov_tipo: true,
                pro_produto: { select: { pro_valor: true } },
            },
        });

        let caixa = 0;

        movimentacoes.forEach((mov) => {
            const valorTotal = mov.mov_qtd * mov.pro_produto.pro_valor;
            if (mov.mov_tipo === 'VENDA') caixa += valorTotal;
            if (mov.mov_tipo === 'COMPRA') caixa -= valorTotal;
        });

        return caixa;
    }

}
