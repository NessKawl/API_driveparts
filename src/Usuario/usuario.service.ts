import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { usu_usuario } from 'generated/prisma'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsuarioService {
    constructor(private readonly pismaService: PrismaService) { }

    async createUser(data: CreateUserDto): Promise<usu_usuario> {
        return this.pismaService.usu_usuario.create({
            data,
        })
    }
}
