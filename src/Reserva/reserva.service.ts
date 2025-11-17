import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, ven_venda, ite_itemVenda, mov_movimentacao_estoque } from 'generated/prisma';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservaHistoricoDto } from './dto/reserva-historico.dto';

@Injectable()
export class ReservaService {
    constructor(private readonly prismaService: PrismaService) { }

    async createReserva(usu_id: number, dto: CreateReservaDto): Promise<any> {
        return this.prismaService.$transaction(async (prisma) => {

            if (dto.ite_qtd <= 0) {
                throw new BadRequestException('A quantidade deve ser maior que zero');
            }

            const produto = await this.findProduto(prisma, dto.pro_id);

            await this.validarEstoque(prisma, produto.pro_id, dto.ite_qtd);

            const valorItem = dto.ite_qtd * produto.pro_valor;

            const venda = await this.criarVenda(prisma, usu_id, dto, valorItem);

            const itemVenda = await this.criarItemVenda(prisma, produto.pro_id, dto.ite_qtd, valorItem, venda.ven_id);

            await this.registrarMovimentacao(prisma, produto.pro_id, venda.ven_id, dto.ite_qtd, 'VENDA');

            return {
                ven_id: venda.ven_id,
                pro_id: produto.pro_id,
                quantidade: dto.ite_qtd,
                status: venda.ven_status,
                periodo: dto.periodo,
            };
        });
    }

    async findProduto(prisma: Prisma.TransactionClient, pro_id: number) {
        const produto = await prisma.pro_produto.findUnique({
            where: { pro_id },
            include: { mov_movimentacao_estoque: true },
        });

        if (!produto) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produto;
    }

    async validarEstoque(prisma: Prisma.TransactionClient, pro_id: number, quantidade: number,) {
        const movimentos = await prisma.mov_movimentacao_estoque.findMany({
            where: { pro_id },
            orderBy: { mov_data: 'asc' },
        });

        let saldo = 0;

        for (const mov of movimentos) {
            if (mov.mov_tipo === 'COMPRA') {
                saldo += mov.mov_qtd;
            } else if (mov.mov_tipo === 'VENDA') {
                saldo -= mov.mov_qtd;
            }
        }

        if (saldo < quantidade) {
            throw new BadRequestException(
                `Quantidade indisponível em estoque. Saldo atual: ${saldo}`,
            );
        }
    }

    async criarItemVenda(prisma: Prisma.TransactionClient, pro_id: number, ite_qtd: number, ite_valor: number, ven_id: number): Promise<ite_itemVenda> {
        return prisma.ite_itemVenda.create({
            data: {
                pro_id,
                ven_id,
                ite_qtd,
                ite_valor,
            },
        });
    }

    async criarVenda(prisma: Prisma.TransactionClient, usu_id: number, dto: CreateReservaDto, valorItem: number): Promise<ven_venda> {
        return prisma.ven_venda.create({
            data: {
                ven_valor: valorItem,
                ven_status: 'RESERVA',
                ven_pagamento: 'PENDENTE',
                ven_periodo: dto.periodo,
                usu_id,
            },
        });
    }

    async registrarMovimentacao(prisma: Prisma.TransactionClient, pro_id: number, ven_id: number, mov_qtd: number, mov_tipo: 'VENDA' | 'COMPRA',): Promise<mov_movimentacao_estoque> {
        return prisma.mov_movimentacao_estoque.create({
            data: {
                pro_id,
                ven_id,
                mov_qtd,
                mov_tipo,
                mov_data: new Date(),
            },
        });
    }

    async atualizarStatusReserva(ven_id: number, novoStatus: 'CANCELADA', usu_id: number) {
        if (novoStatus !== 'CANCELADA') {
            throw new BadRequestException('Status inválido para atualização.');
        }

        return this.prismaService.$transaction(async (prisma) => {
            const venda = await prisma.ven_venda.findUnique({
                where: { ven_id },
                include: {
                    ite_itemVenda: true,
                },
            });

            if (!venda) {
                throw new BadRequestException('Venda não encontrada.');
            }

            if (venda.usu_id !== usu_id) {
                throw new BadRequestException('Você não tem permissão para alterar esta reserva.');
            }

            const vendaAtualizada = await prisma.ven_venda.update({
                where: { ven_id },
                data: { ven_status: novoStatus },
            });

            if (novoStatus === 'CANCELADA') {
                for (const item of venda.ite_itemVenda) {
                    await prisma.mov_movimentacao_estoque.create({
                        data: {
                            pro_id: item.pro_id,
                            ven_id: ven_id,
                            mov_qtd: item.ite_qtd,
                            mov_tipo: 'COMPRA',
                            mov_data: new Date(),
                        },
                    });
                }
            }

            return {
                message: `Reserva ${novoStatus.toLowerCase()} com sucesso.`,
                venda: vendaAtualizada,
            };
        });
    }

    //Históricos
    async findReservasAtivas(usu_id: number): Promise<ReservaHistoricoDto[]> {
        const reservas = await this.prismaService.ven_venda.findMany({
            where: { usu_id, ven_status: 'RESERVA' },
            include: {
                ite_itemVenda: {
                    include: { pro_produto: true },
                },
            },
            orderBy: { ven_data_criacao: 'desc' },
        });

        return reservas as unknown as ReservaHistoricoDto[];
    }

    async findHistoricoGeral(usu_id: number): Promise<ReservaHistoricoDto[]> {
        const historico = await this.prismaService.ven_venda.findMany({
            where: {
                usu_id,
                ven_status: { in: ['CONCLUIDA', 'RESERVA', 'CANCELADA', 'EXPIRADA'] },
            },
            include: {
                ite_itemVenda: {
                    include: { pro_produto: true },
                },
            },
            orderBy: { ven_data_criacao: 'desc' },
        });

        return historico as unknown as ReservaHistoricoDto[];
    }
}