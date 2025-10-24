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
                secret: configService.get<string>('JWT_SECRET') || '123456',
                signOptions: { expiresIn: '60m' }, 
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy], //estratégias 
})
export class AuthModule { }