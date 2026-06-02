import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma.service';
import { UsuarioService } from '../Usuario/usuario.service';

@Injectable()
export class EsqueciSenhaService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly usuarioService: UsuarioService,
    ) { }

    async solicitarCodigo(telefone: string) {
        const usuario = await this.usuarioService.findOneByTelefone(telefone)
        // Segurança
        if (!usuario) {
            return {
                message:
                    'Se existir uma conta, enviaremos um código.',
            };
        }

        // Inativa códigos antigos
        await this.prismaService.tem_temp_code.updateMany({
            where: {
                usu_id: usuario.usu_id,
                tem_used: false,
            },
            data: {
                tem_used: true,
            },
        });

        // Código de 6 dígitos
        const codigo = Math.floor(
            10000 + Math.random() * 90000
        ).toString();

        // Salvar código
        const res = await this.prismaService.tem_temp_code.create({
            data: {
                tem_code: codigo,
                usu_id: usuario.usu_id,
                tem_expiresAt: new Date(Date.now() + 60 * 1000,),
            },
        });

        return {
            message:
                'Código enviado no WhatsApp.',
        };
    }

    // Validar código temporário
    async validarCodigo(telefone: string, codigo: string,) {
        const usuario = await this.usuarioService.findOneByTelefone(telefone);

        if (!usuario) {
            throw new BadRequestException(
                'Código inválido',
            );
        }

        const todosCodigos = await this.prismaService.tem_temp_code.findMany({
            where: {
                usu_id: usuario.usu_id,
            },
        });

        const codigoValido = await this.prismaService.tem_temp_code.findFirst({
            where: {
                usu_id: usuario.usu_id,
                tem_code: codigo,
                tem_used: false,
                tem_expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (!codigoValido) {
            throw new BadRequestException(
                'Código inválido ou expirado',
            );
        }

        return {
            valid: true,
        };
    }

    // Redefinir senha usando o código temporário 
    async redefinirSenha(telefone: string, codigo: string, novaSenha: string) {
        const usuario = await this.usuarioService.findOneByTelefone(telefone);

        if (!usuario) {
            throw new BadRequestException(
                'Usuário inválido',
            );
        }

        const reset = await this.prismaService.tem_temp_code.findFirst({
            where: {
                usu_id: usuario.usu_id,
                tem_code: codigo,
                tem_used: false,
                tem_expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (!reset) {
            throw new BadRequestException(
                'Código inválido',
            );
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        await this.prismaService.$transaction([
            this.prismaService.usu_usuario.update({
                where: {
                    usu_id: usuario.usu_id,
                },
                data: {
                    usu_senha: senhaHash,
                },
            }),

            this.prismaService.tem_temp_code.update({
                where: {
                    tem_id: reset.tem_id,
                },
                data: {
                    tem_used: true,
                },
            }),
        ]);

        return {
            message:
                'Senha alterada com sucesso.',
        };
    }
}