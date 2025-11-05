import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, ven_venda, ite_itemvenda, est_estoque } from 'generated/prisma';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservaHistoricoDto } from './dto/reserva-historico.dto';

type TransactionPrisma = Parameters<Parameters<typeof PrismaService.prototype.$transaction>[0]>[0];

type ProdutoComEstoque = Prisma.pro_produtoGetPayload<{ include: { est_estoque: true } }>;

@Injectable()
export class ReservaService {
    constructor(private readonly prismaService: PrismaService) { }

    async criarReserva(usu_id: number, dto: CreateReservaDto): Promise<any> {
        return this.prismaService.$transaction(async (prisma) => {

            const produto = await this.findProduct(prisma, dto.pro_id);
            this.validateEstoque(produto, dto.ite_quantidade);

            const estoque = produto.est_estoque[0];
            const { valorItem, itemVendaData } = this.prepareItemVenda(produto, dto);

            const itemVenda = await this.createItemVenda(prisma, itemVendaData);

            const venda = await this.createVenda(prisma, usu_id, dto, valorItem, itemVenda);

            await this.updateEstoque(prisma, estoque.est_id, dto.ite_quantidade);

            return {
                ven_id: venda.ven_id,
                pro_id: produto.pro_id,
                quantidade: dto.ite_quantidade,
                status: venda.ven_status,
                periodo: dto.periodo,
            };
        });
    }

    private async findProduct(prisma: TransactionPrisma, pro_id: number): Promise<ProdutoComEstoque> {
        const produto = await prisma.pro_produto.findUnique({
            where: { pro_id },
            include: { est_estoque: true },
        });

        if (!produto) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produto;
    }

    private validateEstoque(produto: ProdutoComEstoque, quantidadeSolicitada: number): void {
        const estoque = produto.est_estoque[0];

        if (!estoque || estoque.est_quantidade < quantidadeSolicitada) {
            throw new BadRequestException('Quantidade indisponível em estoque');
        }
    }

    private prepareItemVenda(produto: ProdutoComEstoque, dto: CreateReservaDto) {
        const valorItem = dto.ite_quantidade * produto.pro_valor;

        const itemVendaData: Prisma.ite_itemvendaUncheckedCreateInput = {
            pro_id: produto.pro_id,
            ite_quantidade: dto.ite_quantidade,
            ite_valor: valorItem,
        };

        return { valorItem, itemVendaData };
    }

    private async createItemVenda(prisma: TransactionPrisma, itemVendaData: Prisma.ite_itemvendaUncheckedCreateInput): Promise<ite_itemvenda> {
        return prisma.ite_itemvenda.create({
            data: itemVendaData,
        });
    }

    private async createVenda(prisma: TransactionPrisma, usu_id: number, dto: CreateReservaDto, valorItem: number, itemVenda: ite_itemvenda): Promise<ven_venda> {
        // ... (código inalterado)
        return prisma.ven_venda.create({
            data: {
                ven_valor: valorItem,
                ven_status: 'RESERVA',
                ven_pagamento: 'PENDENTE',
                ven_periodo: dto.periodo,
                usu_id: usu_id,
                ite_id: itemVenda.ite_id,
            } as Prisma.ven_vendaUncheckedCreateInput,
        });
    }

    private async updateEstoque(prisma: TransactionPrisma, est_id: number, quantidade: number): Promise<est_estoque> {
        return prisma.est_estoque.update({
            where: { est_id: est_id },
            data: { est_quantidade: { decrement: quantidade } },
        });
    }

    // Históricos
    async findReservasAtivas(usu_id: number): Promise<ReservaHistoricoDto[]> {
        const reservas = await this.prismaService.ven_venda.findMany({
            where: { usu_id: usu_id, ven_status: 'RESERVA' },
            include: { ite_itemvenda: { include: { pro_produto: true } } },
            orderBy: { ven_data: 'desc' },
        });

        return reservas as ReservaHistoricoDto[];
    }

    async findHistoricoGeral(usu_id: number): Promise<ReservaHistoricoDto[]> {
        return this.prismaService.ven_venda.findMany({
            where: {usu_id: usu_id, ven_status: { in: ['RESERVA', 'VENDA', 'CANCELADO'] },},
            include: { ite_itemvenda: { include: { pro_produto: true, } } },
            orderBy: {ven_data: 'desc' },
        });
    }

}