import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Assumindo que este é o seu arquivo service

@Module({
    providers: [PrismaService],
    // 💡 A CHAVE AQUI: Exporte o serviço para que outros módulos possam usá-lo!
    exports: [PrismaService],
})
export class PrismaModule { }