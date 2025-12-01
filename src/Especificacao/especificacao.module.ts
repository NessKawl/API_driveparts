import { Module } from '@nestjs/common';
import { EspecificacaoService } from './especificacao.service';
import { EspecificacaoController } from './especificacao.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EspecificacaoService],
  controllers: [EspecificacaoController]
})
export class EspecificacaoModule { }
