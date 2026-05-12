import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MovTipo } from '../../generated/prisma';

@Injectable()
export class MovimentacaoService {
    constructor(private prisma: PrismaService) { }

    async criarMovimentacao(pro_id: number, mov_qtd: number, mov_tipo: 'COMPRA' | 'VENDA') {
        if (!pro_id || !mov_qtd || !mov_tipo) {
            throw new BadRequestException('Dados inválidos para movimentação.');
        }

        const produto = await this.prisma.pro_produto.findUnique({ where: { pro_id } });
        if (!produto) {
            throw new BadRequestException(`Produto ${pro_id} não encontrado.`);
        }

        return this.prisma.mov_movimentacao_estoque.create({
            data: {
                pro_id,
                mov_qtd,
                mov_tipo,
                mov_data: new Date(),
            },
        });
    }

    async criarMovimentacaoManual(
        pro_id: number,
        mov_qtd: number,
        mov_tipo: MovTipo, mov_data: string
    ) {
        if (!pro_id || !mov_qtd || !mov_tipo || !mov_data) {
            throw new BadRequestException(
                'Dados inválidos.'
            );
        }

        const produto = await this.prisma.pro_produto.findUnique({
            where: { pro_id },
        });

        if (!produto) {
            throw new BadRequestException(
                'Produto não encontrado.'
            );
        }

        // calcula estoque atual
        const movimentacoes =
            await this.prisma.mov_movimentacao_estoque.findMany({
                where: { pro_id },
            });

        const estoqueAtual = movimentacoes.reduce((total, mov) => {

            // entradas
            if (
                mov.mov_tipo === 'COMPRA' || mov.mov_tipo === 'DEVOLUCAO' || mov.mov_tipo === 'OUTROS'
                // mov.mov_tipo === ''
            ) {
                return total + mov.mov_qtd;
            }

            // saídas
            return total - mov.mov_qtd;

        }, 0);

        // valida estoque
        const tiposSaida = [
            'VENDA',
            'DEFEITO',
            'PERDA',
            'VENCIMENTO',
            'USO_E_CONSUMO'
        ];

        if (
            tiposSaida.includes(mov_tipo) &&
            estoqueAtual < mov_qtd
        ) {
            throw new BadRequestException(
                'Estoque insuficiente.'
            );
        }

        // cria movimentação
        return this.prisma.mov_movimentacao_estoque.create({
            data: {
                pro_id,
                mov_qtd,
                mov_tipo,
                mov_data: new Date(mov_data),
            },
        });
    }
}
