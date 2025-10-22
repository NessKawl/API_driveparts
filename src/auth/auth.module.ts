import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Para gerenciar SECRET
import { UsuarioModule } from '../Usuario/usuario.module'; // Para usar o UsersService
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy'; // Importe a estratégia
import { PrismaModule } from 'src/prisma.module';

@Module({
    imports: [
        UsuarioModule,
        PrismaModule,
        PassportModule,
        // Configuração do JWT:
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                // É CRÍTICO que essa chave seja mantida em segredo (use .env)
                secret: configService.get<string>('JWT_SECRET') || 'SUA_CHAVE_SECRETA_PADRAO',
                signOptions: { expiresIn: '60m' }, // Token expira em 60 minutos
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy], // Adicione as estratégias aqui
})
export class AuthModule { }