import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsuarioModule } from './Usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './Produto/produto.module';
import { PerfilModule } from './Perfil/perfil.module';
import { ReservaModule } from './Reserva/reserva.module';
import { DashboardModule } from './Dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';
import { MovimentacaoModule } from './Movimentacao/movimentacao.module';
import { EspecificacaoModule } from './Especificacao/especificacao.module';

@Module({
  imports: [UsuarioModule, AuthModule, ProdutoModule, PerfilModule, ReservaModule, DashboardModule, UploadModule, MovimentacaoModule, EspecificacaoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
