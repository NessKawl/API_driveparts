import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { usu_usuario } from 'generated/prisma'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsuarioService {
    constructor(private readonly prismaService: PrismaService) { }

    async findOneByTelefone(usu_tel: string) {
        return this.prismaService.usu_usuario.findUnique({
            where: { usu_tel },
        })
    }
}
