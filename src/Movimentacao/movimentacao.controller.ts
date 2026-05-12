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

    @Post('movimentacao/manual')
    async criarMovimentacaoManual(
        @Body() body: { pro_id: number; mov_qtd: number; mov_tipo: string; mov_data: string },
    ) {
        const { pro_id, mov_qtd, mov_tipo, mov_data } = body;
        return this.movimentacaoService.criarMovimentacaoManual(pro_id, mov_qtd, mov_tipo as any, mov_data);
    }
}
