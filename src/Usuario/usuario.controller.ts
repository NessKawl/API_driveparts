import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { usu_usuario } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuariService: UsuarioService) { }

}
