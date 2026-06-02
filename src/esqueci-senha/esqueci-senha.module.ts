import { Module } from '@nestjs/common';
import { EsqueciSenhaController } from './esqueci-senha.controller';
import { EsqueciSenhaService } from './esqueci-senha.service';
import { PrismaModule } from '../prisma.module';
import { UsuarioModule } from '../Usuario/usuario.module';

@Module({
  imports: [PrismaModule, UsuarioModule],
  controllers: [EsqueciSenhaController],
  providers: [EsqueciSenhaService]
})
export class EsqueciSenhaModule {}
