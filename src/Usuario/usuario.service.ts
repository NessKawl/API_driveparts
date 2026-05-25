import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, usu_usuario } from 'generated/prisma'
import { Logger } from '@nestjs/common';

@Injectable()
export class UsuarioService {
    private readonly logger = new Logger(UsuarioService.name);

    constructor(private readonly prismaService: PrismaService) { }

    async findAllUsers(): Promise<usu_usuario[]> {
        return this.prismaService.usu_usuario.findMany()
    }

    async findOneUser(where: Prisma.usu_usuarioWhereUniqueInput) {
        return this.prismaService.usu_usuario.findUnique({
            where,
        })
    }

    async findOneByTelefone(usu_tel: string) {
        return this.prismaService.usu_usuario.findUnique({
            where: { usu_tel },
        })
    }
}
