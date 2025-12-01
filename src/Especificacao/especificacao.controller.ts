import { Body, Controller, Get, Post } from '@nestjs/common';
import { EspecificacaoService } from './especificacao.service';
import { esp_especificacao } from 'generated/prisma';
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

    @Post("vinculaEsp")
    async vincularEsp(@Body() createProEspDto: createProEspDto) {
        return this.especificacaoService.vincularEspecificacao(createProEspDto);
    }

    @Get('metricas')
    async buscaMetricas() {
        return this.especificacaoService.buscaMetricas()
    }
}
