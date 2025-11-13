import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
