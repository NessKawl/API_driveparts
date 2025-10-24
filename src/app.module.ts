import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsuarioModule } from './Usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './Produto/produto.module';

@Module({
  imports: [UsuarioModule, AuthModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
