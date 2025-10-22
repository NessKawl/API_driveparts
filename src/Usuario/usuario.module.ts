import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module'; // Importa o PrismaModule
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  // ✅ Importando o PrismaModule para que o UsuarioService possa usar o PrismaService
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  // ✅ Mantenha a exportação do seu serviço principal para o AuthModule
  exports: [UsuarioService],
})
export class UsuarioModule { }