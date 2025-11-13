import { Controller, Post, Body } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';

@Controller('estoque')
export class MovimentacaoController {
    constructor(private readonly movimentacaoService: MovimentacaoService) { }

    @Post('movimentacao')
    async criarMovimentacao(
        @Body() body: { pro_id: number; mov_qtd: number; mov_tipo: 'COMPRA' | 'VENDA' },
    ) {
        const { pro_id, mov_qtd, mov_tipo } = body;
        return this.movimentacaoService.criarMovimentacao(pro_id, mov_qtd, mov_tipo);
    }
}
