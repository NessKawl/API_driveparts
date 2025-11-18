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


    async atualizarStatusDashboard(
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

    async listarTodasVendas() {
        const vendas = await this.prisma.ven_venda.findMany({

            include: {
                usu_usuario: { select: { usu_nome: true, usu_tel: true } },
                ite_itemVenda: {
                    include: {
                        pro_produto: { select: { pro_nome: true, pro_valor: true, pro_marca: true } },
                    },
                },
            },
            where: {
                ven_status: "CONCLUIDA",
            }
        });

        return vendas;
    }

    async getVendasPorPagamento() {
        const vendas = await this.prisma.ven_venda.groupBy({
            by: ['ven_pagamento'],
            _count: { ven_id: true },
        });

        return vendas.map(v => ({
            formaPagamento: v.ven_pagamento,
            valor: v._count.ven_id || 0,
        }));

    }

    async getMovimentacoes() {
        const movimentacoes = await this.prisma.mov_movimentacao_estoque.findMany({
            orderBy: { mov_id: 'desc' }, // ordena pelo id da movimentação, do mais novo para o mais antigo
            select: {
                mov_id: true,
                mov_data: true,
                mov_qtd: true,
                mov_tipo: true,
                pro_id: true,
                pro_produto: { select: { pro_nome: true, pro_valor: true } },
            },
        });

        return movimentacoes.map(m => ({
            tipo: m.mov_tipo === 'VENDA' ? 'Entrada' : 'Saída',
            descricao: `${m.mov_tipo === 'VENDA' ? 'Venda' : 'Compra'} do produto ${m.pro_produto.pro_nome}`,
            valor: m.mov_qtd * m.pro_produto.pro_valor,
            data: m.mov_data,        // <<< ESTE É O CERTO
            id: m.mov_id,
        }));

    }



}
