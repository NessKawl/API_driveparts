import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, pro_produto, usu_usuario } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class PerfilService {

    private readonly logger = new Logger(PerfilService.name);

    constructor(private readonly prismaService: PrismaService) { }

    async updatePerfil(id: number, dto: UpdateUserDto) {

        const dadosAtualizados: any = {};

        if (dto.nome) {
            dadosAtualizados.usu_nome = dto.nome;
        }

        if (dto.senha) {

            const senhaHash = await bcrypt.hash(dto.senha, 10);

            dadosAtualizados.usu_senha = senhaHash;
        }

        if (Object.keys(dadosAtualizados).length === 0) {
            this.logger.warn(
                `UPDATE FAILED - NO DATA SENT - ID: ${id}`
            );

            throw new Error("Nenhum dado enviado");
        }

        const usuarioAtualizado = await this.prismaService.usu_usuario.update({
            where: {
                usu_id: id,
            },
            data: dadosAtualizados,
        });

        this.logger.log(
            `USER UPDATED - ID: ${id}`
        );

        return usuarioAtualizado;
    }


}
