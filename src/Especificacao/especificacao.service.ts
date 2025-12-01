import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEspecificacaoDto } from 'src/Especificacao/dto/create-especificacao.dto';
import { esp_especificacao, Prisma } from 'generated/prisma';
import { createProEspDto } from './dto/create-proEsp.dto';

@Injectable()
export class EspecificacaoService {
    constructor(private readonly prismaService: PrismaService) { }

    async createEspecificacao(data: CreateEspecificacaoDto): Promise<Prisma.BatchPayload> {

        const dadosEspecificacao = data.esp_nome.map(nome => ({
            esp_nome: nome,
            cat_id: data.cat_id
        }))

        return this.prismaService.esp_especificacao.createMany({
            data: dadosEspecificacao
        });
    }

    async vincularEspecificacao(data: createProEspDto) {

        const dadosProEsp = data.esp.map(item => {
            return {
                pro_id: data.pro_id,
                esp_id: item.esp_id,
                pro_esp_valor: item.pro_esp_valor,
                met_id: item.met_id
            }
        });
        return this.prismaService.pro_esp.createMany({ data: dadosProEsp });

    }

    async buscaMetricas() {
        return await this.prismaService.met_metrica.findMany()
    }

    async buscaUltimaEsp(): Promise<esp_especificacao | null> {
        return this.prismaService.esp_especificacao.findFirst({
            orderBy: {
                esp_id: 'desc'
            }
        })

    }
}
