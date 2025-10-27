import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsuarioModule } from './Usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './Produto/produto.module';
import { PerfilModule } from './Perfil/perfil.module';

@Module({
  imports: [UsuarioModule, AuthModule, ProdutoModule, PerfilModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
