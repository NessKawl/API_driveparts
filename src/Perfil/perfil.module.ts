import { PrismaModule } from '../prisma.module'; // Importa o PrismaModule
import { Module } from '@nestjs/common';
import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';
import { ReservaModule } from '../Reserva/reserva.module';

@Module({
  imports: [PrismaModule, ReservaModule] ,
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
