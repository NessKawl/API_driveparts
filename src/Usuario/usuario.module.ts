import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UsuarioService, PrismaService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
