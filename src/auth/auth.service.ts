import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/Usuario/usuario.service';
import { CreateUserDto } from 'src/Usuario/dto/create-user.dto';
import { usu_usuario } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private prismaService: PrismaService
    ) { }

    async createUser(data: CreateUserDto): Promise<usu_usuario> {
        const hashPassword = await bcrypt.hash(data.usu_senha, 10);

        return this.prismaService.usu_usuario.create({
            data: {
                ...data,
                usu_senha: hashPassword
            }
        })
    }

    async validateUser(usu_tel: string, senhaRecebida: string): Promise<any> {
        const user = await this.usuarioService.findOneByTelefone(usu_tel);

        if (!user) {
            console.log("Usuario não encontrado no DB");
            return null;
        }

        console.log('Hash do DB:', user.usu_senha);

        const isPasswordValid = await bcrypt.compare(senhaRecebida, user.usu_senha);

        if (isPasswordValid) {
            console.log('SUCESSO: Usuário validado.');
            const { usu_senha, ...result } = user;
            return result;
        }
        
        console.log('ERRO: Senha inválida.');
        return null;
    }

    async login(user: any) {
        const payload = {
            usu_tel: user.usu_tel,
            sub: user.usu_id
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}