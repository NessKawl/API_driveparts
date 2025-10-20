
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect().then((result) => {
            console.log("Conectado ao banco de dados com sucesso!");
        }).catch((err) => {
            console.log("Erro ao conectar ao banco de dados ", err);
        });
    }
}
