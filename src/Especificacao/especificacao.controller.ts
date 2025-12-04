import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EspecificacaoService } from './especificacao.service';
import { esp_especificacao, pro_esp } from 'generated/prisma';
import { CreateEspecificacaoDto } from './dto/create-especificacao.dto';
import { createProEspDto } from './dto/create-proEsp.dto';

@Controller('especificacao')
export class EspecificacaoController {
    constructor(private especificacaoService: EspecificacaoService) { }

    @Post('cadastroEsp')
    async cadastrarEspecificacoes(@Body() createEspecificacoesDto: CreateEspecificacaoDto) {
        return this.especificacaoService.createEspecificacao(createEspecificacoesDto);
    }

    @Get("ultimaEsp")
    async buscaUltimaEsp(): Promise<esp_especificacao | null> {
        return this.especificacaoService.buscaUltimaEsp()
    }

    @Get(':id')
    async buscaEspecificacao(@Param('id', ParseIntPipe) esp_id: number): Promise<esp_especificacao | null> {
        return this.especificacaoService.buscaEspecificacao(esp_id)
    }

    @Get("ProEsp/:id")
    async buscar(@Param('id') id: string) {
        return this.especificacaoService.buscaProEsp(Number(id));
    }

    @Post("vinculaEsp")
    async vincularEsp(@Body() createProEspDto: createProEspDto) {
        return this.especificacaoService.vincularEspecificacao(createProEspDto);
    }

    @Get('metricas')
    async buscaMetricas() {
        return this.especificacaoService.buscaMetricas()
    }
}
