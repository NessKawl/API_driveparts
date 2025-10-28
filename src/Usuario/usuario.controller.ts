import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { usu_usuario } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuariService: UsuarioService) { }

    @Get()
    async findAllUsers(): Promise<usu_usuario[]> {
        return this.usuariService.findAllUsers()
    }

    @Get(':id')
    async findOneByTelefone(@Param('id') usu_id: string): Promise<usu_usuario> {
        const idNumber = parseInt(usu_id)

        const usuario = await this.usuariService.findOneUser(
            { usu_id: idNumber }
        )

        if (!usuario) {
            throw new NotFoundException(`Usuário com o ID ${usu_id} não encontrado`)
        }

        return usuario

    }
}   
