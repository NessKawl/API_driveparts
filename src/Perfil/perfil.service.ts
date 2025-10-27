import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, pro_produto, usu_usuario } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updtade-user.dto';

@Injectable()
export class PerfilService {
    constructor(private readonly prismaService: PrismaService) { }

    async updatePerfil(idNumber: number, dto: UpdateUserDto) {
        const usuario = await this.prismaService.usu_usuario.findUnique({
            where: { usu_id: idNumber },
        });

        if (!usuario) throw new NotFoundException("Usuário não encontrado");

        if (dto.usu_senha) {
            dto.usu_senha = await bcrypt.hash(dto.usu_senha, 10);
        }

        const atualizado = await this.prismaService.usu_usuario.update({
            where: { usu_id: idNumber },
            data: dto,
        });

        const { usu_senha, ...usuarioSemSenha } = atualizado;
        return usuarioSemSenha;
    }


}
